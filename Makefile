.PHONY: test lint test-coverage

test:
	npm test

test-coverage:
	npm run test:coverage

lint:
	npm run lint

lint-fix:
	npm run lint:fix
