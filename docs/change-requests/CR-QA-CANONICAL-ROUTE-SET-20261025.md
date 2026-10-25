# CR-QA-CANONICAL-ROUTE-SET-20261025

Production Visual QA previously treated redirect-only legacy routes as canonical managed pages, creating false layout failures after redirects.

The managed-page set is now aligned to the current React router canonical pages. Redirects remain tested through the alias list.

No public website behavior is changed.
