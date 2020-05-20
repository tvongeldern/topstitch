resource "aws_codebuild_project" "api_build" {
	name = "topstitch_${terraform.workspace}_api_build"
	build_timeout = 60
	service_role = aws_iam_role.iam_for_codebuild.arn

	artifacts {
		type = "NO_ARTIFACTS"
	}

	cache {
    type  = "LOCAL"
    modes = ["LOCAL_DOCKER_LAYER_CACHE", "LOCAL_SOURCE_CACHE"]
  }

  environment {
    compute_type                = "BUILD_GENERAL1_SMALL"
    image                       = "aws/codebuild/amazonlinux2-x86_64-standard:1.0"
    type                        = "LINUX_CONTAINER"
    image_pull_credentials_type = "CODEBUILD"
		privileged_mode = true

    environment_variable {
      name  = "SOME_KEY1"
      value = "SOME_VALUE1"
    }
  }

	source {
		type = "GITHUB"
		git_clone_depth = 1
		location = "https://github.com/tvongeldern/topstitch.git"
		report_build_status = true
		auth {
			type = "OAUTH"
			resource = var.github_token
		}
	}

	source_version = local.git_branch
}

resource "aws_codebuild_webhook" "api_codebuild_webhook" {
	project_name = aws_codebuild_project.api_build.name
}
