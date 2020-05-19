# PASSED FROM ENV VARS
variable "aws_access_key_id" {
	type = string
}

variable "aws_secret_access_key" {
	type = string
}

variable "aws_default_region" {
	type = string
}

variable "db_username" {
	type = string
}

variable "db_password" {
	type = string
}

# BASED ON WORKSPACE
variable "db_instance_class" {
	type = map(string)
	default = {
		dev = "db.t2.micro"
		prod = "db.t2.micro"
	}
}

locals {
	db_instance_class = var.db_instance_class[terraform.workspace]
	lambdas_dir = ".build/lambdas"
}