# How to Create a Static Website on AWS Using S3, CloudFront, Route 53, and Certificate Manager

This repository contains all the resources and steps needed to create a static website on AWS using S3, CloudFront, Route 53, and AWS Certificate Manager.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Step-by-Step Guide](#step-by-step-guide)
  - [1. Setting Up an S3 Bucket](#1-setting-up-an-s3-bucket)
  - [2. Configuring CloudFront](#2-configuring-cloudfront)
  - [3. Using AWS Certificate Manager](#3-using-aws-certificate-manager)
  - [4. Setting Up Route 53](#4-setting-up-route-53)
  - [5. Redirecting Traffic](#5-redirecting-traffic)
- [Conclusion](#conclusion)
- [Resources](#resources)

## Introduction

In this tutorial, we will walk you through the complete process of setting up a static website on AWS, including creating an S3 bucket, configuring CloudFront for global content delivery, setting up a custom domain with Route 53, and securing your site with HTTPS using AWS Certificate Manager.

## Prerequisites

- An AWS account
- Basic knowledge of AWS services
- Domain name registered (preferably managed by AWS Route 53)

## Step-by-Step Guide

### 1. Setting Up an S3 Bucket

1. Open the AWS Management Console and navigate to S3.
2. Create a new bucket with a unique name.
3. Upload your website files to the bucket.

### 2. Configuring CloudFront

1. Open the CloudFront console.
2. Create a new CloudFront distribution.
3. Configure the origin settings to point to your S3 bucket.
4. Set up cache behaviors and distribution settings as required.

### 3. Using AWS Certificate Manager

1. Open the AWS Certificate Manager (ACM) console.
2. Request a new certificate for your custom domain.
3. Validate the domain ownership as instructed.
4. Attach the certificate to your CloudFront distribution.

### 4. Setting Up Route 53

1. Open the Route 53 console.
2. Create a new hosted zone for your domain if not already done.
3. Create an Alias record pointing to your CloudFront distribution.

### 5. Redirecting Traffic

1. (Optional) Create an S3 bucket named `www.yourdomain.com` for redirection.
2. Configure static website hosting to redirect to `https://yourdomain.com`.
3. Update Route 53 to point `www.yourdomain.com` to the redirection bucket.

## Conclusion

By following this guide, you should have a fully functional static website hosted on AWS, secured with HTTPS, and served globally via CloudFront.

## Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/index.html)
- [AWS CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/index.html)
- [AWS Certificate Manager Documentation](https://docs.aws.amazon.com/acm/index.html)
- [AWS Route 53 Documentation](https://docs.aws.amazon.com/route53/index.html)
