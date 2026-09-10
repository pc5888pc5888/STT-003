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
        row=copy.deepcopy(next(r for r in self.rows if r['series']=='legal')); row['category']='M-news'
        result=sync.merge(self.data,[row],self.now,1)
        self.assertEqual(result['stats']['total'],self.n); self.assertEqual(result['stats']['legal'],self.data['stats']['legal']-1); self.assertEqual(result['stats']['news'],self.data['stats']['news']+1)
    def test_new_record_and_duplicate_are_idempotent(self):
        row={**self.rows[0],'url':'https://94m.com.tw/articles/testonly-new','title':'Test fixture, never published'}
        result=sync.merge(self.data,[row,row],self.now,1); self.assertEqual(result['stats']['total'],self.n+1)
    def test_unknown_category_is_pending_not_guessed(self):
        row={**self.rows[0],'url':'https://94m.com.tw/articles/testonly-pending','category':'焦點'}
        result=sync.merge(self.data,[row],self.now,1); self.assertEqual(result['stats']['total'],self.n); self.assertEqual(result['stats']['pending'],1)
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
if __name__=='__main__': unittest.main()
