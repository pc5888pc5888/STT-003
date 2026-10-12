import copy, importlib.util, json, pathlib, re, unittest
ROOT=pathlib.Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('sync',ROOT/'scripts/mmedia_sync.py'); sync=importlib.util.module_from_spec(spec); spec.loader.exec_module(sync)
class ArchiveTests(unittest.TestCase):
    def setUp(self):
        self.data=json.loads(sync.CATALOG.read_text(encoding='utf-8')); self.rows=copy.deepcopy(self.data['articles']); self.now='2026-09-10T12:00:00+00:00'; self.n=len(self.rows)
    def test_baseline_and_author_identity(self):
        self.assertGreaterEqual(self.n,212); self.assertEqual(len({r['url'] for r in self.rows}),self.n); self.assertTrue(all(sync.verified(r) for r in self.rows))
        self.assertEqual(self.data['baseline']['canonicalSha256'],'6bc22afe721807e841c05643003d935b33f5d11c6e170572f148943c57993b20')
    def test_partial_read_cannot_remove_history(self):
        result=sync.merge(self.data,self.rows[:12],self.now,1); self.assertEqual(result['stats']['total'],self.n); self.assertEqual(result['sync']['retainedNotSeen'],self.n-12)
    def test_empty_read_cannot_remove_history(self):
        self.assertEqual(sync.merge(self.data,[],self.now,1)['stats']['total'],self.n)
    def test_reclassification_updates_same_url(self):
        row=copy.deepcopy(next(r for r in self.rows if r['series']=='legal' and not sync.owner_series_for(r))); row['category']='M-news'
        result=sync.merge(self.data,[row],self.now,1)
        self.assertEqual(result['stats']['total'],self.n); self.assertEqual(result['stats']['legal'],self.data['stats']['legal']-1); self.assertEqual(result['stats']['news'],self.data['stats']['news']+1)
    def test_new_record_and_duplicate_are_idempotent(self):
        row={**self.rows[0],'url':'https://94m.com.tw/articles/testonly-new','title':'Test fixture, never published'}
        result=sync.merge(self.data,[row,row],self.now,1); self.assertEqual(result['stats']['total'],self.n+1)
    def test_unknown_category_is_pending_not_guessed(self):
        row={**self.rows[0],'url':'https://94m.com.tw/articles/testonly-pending','category':'焦點','title':'未知分類測試文章'}
        before=len(self.data.get('pending',[]))
        result=sync.merge(self.data,[row],self.now,1)
        self.assertEqual(result['stats']['total'],self.n); self.assertEqual(result['stats']['pending'],before+1)
    def test_explicit_humanistic_column_label_overrides_broad_source_category(self):
        row={**self.rows[0],'url':'https://94m.com.tw/articles/testonly-humanistic','category':'專家','title':'測試文章｜人文地景產專欄'}
        result=sync.merge(self.data,[row],self.now,1)
        item=next(r for r in result['articles'] if r['url']==row['url'])
        self.assertEqual(item['series'],'humanistic'); self.assertNotIn(row['url'],{r['url'] for r in result.get('pending',[])})
    def test_other_author_and_external_url_rejected(self):
        for row in ({**self.rows[0],'author':'其他作者'},{**self.rows[0],'url':'https://example.com/articles/test'}):
            with self.assertRaises(ValueError): sync.merge(self.data,[row],self.now,1)
    def test_full_excerpt_not_replaced_by_truncated_prefix(self):
        self.assertEqual(sync.preserve_excerpt('完整摘要應當保留。','完整摘要...'),'完整摘要應當保留。')
    def test_whitespace_only_difference_preserves_original(self):
        original={**self.rows[0],'title':'原始  標題','excerpt':'原始\r\n\r\n摘要'}
        previous=copy.deepcopy(self.data); previous['articles']=[original]
        result=sync.merge(previous,[{**original,'title':'原始 標題','excerpt':'原始 摘要'}],self.now,1)
        self.assertEqual(result['articles'][0]['title'],original['title']); self.assertEqual(result['articles'][0]['excerpt'],original['excerpt'])
    def test_owner_batch_contains_all_24_legal_assignments(self):
        expected=set('f30f4f 73e350 503bd6 c3a49d 60fee1 a715b9 96a310 71a227 e93863 c788fa a20485 32f4bd 2b8798 eb48c1 b60ae0 3a43d6 d8eb94 088d9f e884f0 087264 0364df baaf84 04edae e479da'.split())
        self.assertTrue(expected.issubset(sync.OWNER_SERIES))
        for article_id in expected:
            self.assertEqual(sync.OWNER_SERIES[article_id],'legal')
    def test_owner_assignment_overrides_subject_title_and_source_category(self):
        for article_id in sync.OWNER_SERIES:
            row={'url':'https://94m.com.tw/articles/'+article_id+'?from_admin=true','title':'AI 與能源｜人文地景產專欄','category':'M-news'}
            self.assertEqual(sync.series_for(row),'legal')
    def test_owner_assignment_does_not_match_another_publisher(self):
        self.assertIsNone(sync.owner_series_for({'url':'https://example.com/articles/f30f4f'}))
    def test_owner_assignment_survives_absence_and_preserves_source_fields(self):
        row=copy.deepcopy(next(r for r in self.rows if sync.owner_series_for(r))); row['series']='news'; row['seriesTitle']=sync.TITLES['news']
        previous={**self.data,'articles':[row],'pending':[]}
        result=sync.merge(previous,[],self.now,1); item=result['articles'][0]
        self.assertEqual(item['series'],'legal'); self.assertEqual(result['stats']['total'],1)
        for field in sync.FIELDS: self.assertEqual(item[field],row[field])
    def test_owner_batch_merge_is_idempotent_and_has_no_placeholder_publication(self):
        first=sync.merge(self.data,self.rows,self.now,1); second=sync.merge(first,self.rows,self.now,1)
        self.assertEqual(first['articles'],second['articles']); self.assertEqual(first['stats'],second['stats'])
        ids={r['url'].rsplit('/',1)[-1] for r in first['articles']}
        self.assertEqual(set(first['ownerAssignments']['awaitingPublicSource']),set(sync.OWNER_SERIES)-ids)
        self.assertTrue(all(sync.verified(row) for row in first['articles']))
if __name__=='__main__': unittest.main()
