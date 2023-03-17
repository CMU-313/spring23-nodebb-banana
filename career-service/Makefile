#!make
.PHONY: clean 

help:
	@echo "Usage: make <target>\n"
	@awk 'BEGIN {FS = ":.*##"} /^[0-9a-zA-Z_-]+:.*?## / { printf "  * %-40s -%s\n", $$1, $$2 }' $(MAKEFILE_LIST)|sort

# Cleaning

clean: ## Does nothing

-include docker/Makefile