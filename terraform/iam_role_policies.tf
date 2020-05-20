resource "aws_iam_role_policy" "build_policy" {
	role = aws_iam_role.iam_for_codebuild

	policy = jsonencode({
		"Version": "2012-10-17",
		"Statement": [
			{
				"Effect": "Allow",
				"Resource": [
					"*"
				],
				"Action": [
					"logs:CreateLogGroup",
					"logs:CreateLogStream",
					"logs:PutLogEvents"
				]
			},
			{
				"Effect": "Allow",
				"Action": [
					"ec2:CreateNetworkInterface",
					"ec2:DescribeDhcpOptions",
					"ec2:DescribeNetworkInterfaces",
					"ec2:DeleteNetworkInterface",
					"ec2:DescribeSubnets",
					"ec2:DescribeSecurityGroups",
					"ec2:DescribeVpcs"
				],
				"Resource": "*"
			},
			{
				"Effect": "Allow",
				"Action": [
					"ec2:CreateNetworkInterfacePermission"
				],
				"Resource": [
					"arn:aws:ec2:us-east-1:123456789012:network-interface/*"
				],
				"Condition": {
					"StringEquals": {
						"ec2:Subnet": [
							"${aws_subnet.example1.arn}",
							"${aws_subnet.example2.arn}"
						],
						"ec2:AuthorizedService": "codebuild.amazonaws.com"
					}
				}
			},
			{
				"Effect": "Allow",
				"Action": [
					"s3:*"
				],
				"Resource": [
					"${aws_s3_bucket.example.arn}",
					"${aws_s3_bucket.example.arn}/*"
				]
			}
		]
	})
}