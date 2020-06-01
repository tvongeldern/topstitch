include env/aws.env
include env/github.env
ENVIRONMENT?=dev
TF_WORKSPACE?=$(ENVIRONMENT)
include env/$(ENVIRONMENT).env
TF=$(shell which terraform 2>/dev/null || echo build/bin/terraform)
export

plan:
	$(TF) plan

apply:
	$(TF) apply

destroy:
	$(TF) destroy
