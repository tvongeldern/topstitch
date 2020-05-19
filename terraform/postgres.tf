resource "aws_db_instance" "postgres" {
  identifier = "topstitch-${terraform.workspace}-${local.db_name}"
  name                 = local.db_name
  username             = var.db_username
  password             = var.db_password
	allocated_storage     = 50
  max_allocated_storage = 100
	instance_class = local.db_instance_class
  engine = "postgres"
  final_snapshot_identifier = "topstitch-${terraform.workspace}-${local.db_name}"
}
