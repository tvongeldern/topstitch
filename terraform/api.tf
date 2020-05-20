resource "aws_ecs_task_definition" "task_api" {
  family = "topstitch_${terraform.workspace}_task_api"
  container_definitions = jsonencode([
    {
      "cpu": 128,
      "environment": [
				{
					"name": "FORCE_COLOR",
					"value": "1"
				},
				{
					"name": "NODE_ENV",
					"value": "production"
				},
				{
					"name": "PORT",
					"value": "8000"
				},
				# {
				# 	"name": "POSTGRES_USER",
				# 	"value": "${aws_db_instance.postgres.username}"
				# },
				# {
				# 	"name": "POSTGRES_PASSWORD",
				# 	"value": "${aws_db_instance.postgres.password}"
				# },
				# {
				# 	"name": "POSTGRES_DB",
				# 	"value": "${aws_db_instance.postgres.name}"
				# },
				{
					"name": "POSTGRES_HOST",
					"value": "postgres"
				},
				{
					"name": "POSTGRES_PORT",
					"value": "5432"
				}
      ],
      "essential": true,
      "image": "node:12",
      "memory": 128,
      "memoryReservation": 64,
      "name": "api"
    }
  ])
}

resource "aws_ecs_service" "api" {
  name = "topstitch_${terraform.workspace}_api"
  cluster = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.task_api.family
}
