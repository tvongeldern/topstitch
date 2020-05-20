provider "github" {
	token = var.github_token
	organization = "topstitch"
}

resource "github_repository" "topstitch" {
  name        = "topstitch"
  description = "The fitting room for online clothing stores"

  private = true
}

resource "github_repository_webhook" "github_webhook" {
	active     = true
  events     = ["push"]
  repository = "topstitch"

  configuration {
    url          = aws_codebuild_webhook.codebuild_webhook.payload_url
    secret       = aws_codebuild_webhook.codebuild_webhook.secret
    content_type = "json"
    insecure_ssl = false
  }
}
