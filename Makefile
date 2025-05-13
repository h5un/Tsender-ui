# Makefile to install dependencies

install:
	pnpm add -D vitest vite-tsconfig-paths 
install test:
	pnpm add -D @synthetixio/synpress
	pnpm create playwright@latest
	