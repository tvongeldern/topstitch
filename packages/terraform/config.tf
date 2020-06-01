# STATIC
variable "global_cidr" {
	type = string
	default = "0.0.0.0/0"	
}

variable "lambdas_dir" {
	type = string
	default = ".build/lambdas"
}

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
