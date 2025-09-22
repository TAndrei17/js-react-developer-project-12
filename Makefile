lint-frontend:
	make -C frontend lint

install:
	npm ci

build-frontend:
	cd frontend && npm install && npm run build

start-backend:
	npx @hexlet/chat-server --static ./frontend/build --port $$PORT

start-frontend-dev:
	cd frontend && npm start

start: build-frontend start-backend
