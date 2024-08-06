
# How to Create a Static Website on AWS Using S3, CloudFront, Route 53, and Certificate Manager

This repository contains all the resources and steps needed to create a static website on AWS using S3, CloudFront, Route 53, and AWS Certificate Manager.

## Table of Contents

- [Architecture](#Architecture)
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Step-by-Step Guide](#step-by-step-guide)
  - [1. Setting Up an S3 Bucket](#1-setting-up-an-s3-bucket)
  - [2. Configuring CloudFront](#2-configuring-cloudfront)
  - [3. Setting Up Route 53](#4-setting-up-route-53)
  - [4. Redirecting Traffic](#5-redirecting-traffic)
- [Conclusion](#conclusion)
- [Youtube Tutorial](#Youtube-Tutorial)

## Architecture
![Architecture](https://github.com/0xp4ck3t/AWS-Project-Static-Website/blob/main/static_architecture.png)

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
4. Enable origin access control settings and create OAC
5. Change the viewer protocol policy to Redirect HTTP to HTTPS
6. Select Do not enable security protections on the Web Application Firewall(WAF)
7. Add the custom domain name to the Alternate domain name(CNAME)
8. Click on **Request a Certificate** to obtain an SSL certificate using **AWS Certificate Manager**.
   - Request a public certificate
   - Add the FQDN
   - Validate the domain ownership as instructed.
   - Create the record in Route 53
9. Set the Default root object to **index.html**
10. Create Distribution
11. Update the S3 bucket with the provided policy 


### 4. Setting Up Route 53

1. Open the Route 53 console.
2. Create a new hosted zone for your domain if not already done.
3. Create a simple routing policy with an Alias record that points to your CloudFront distribution.


### 5. Redirecting Traffic

1. (Optional) Create an S3 bucket named `www.yourdomain.com` for redirection.
2. Configure static website hosting to redirect to `https://yourdomain.com`.
3. Update Route 53 to point `www.yourdomain.com` to the redirection bucket.

## Conclusion

By following this guide, you should have a fully functional static website hosted on AWS, secured with HTTPS, and served globally via CloudFront.

## Youtube Tutorial

For a detailed walkthrough, follow this tutorial on YouTube: [Watch the Tutorial](https://youtu.be/6KLPcnsG0OE?si=h8OPj0itp3y3ezrB)


# Part 2 - Implement Visitor Count Tracking with AWS API Gateway, Lambda, and DynamoDB

In this section, we will implement a visitor count tracking system using AWS API Gateway, Lambda, and DynamoDB.

## Architecture
![Architecture](https://github.com/0xp4ck3t/AWS-Project-Static-Website/blob/main/serverless_architecture.png)

## Introduction

In this section, we will implement a visitor count tracking system using AWS API Gateway, Lambda, and DynamoDB.

## Step 1: Set Up DynamoDB Table

1. Open the AWS Management Console.
2. Navigate to DynamoDB.
3. Create a new table named `visitorcounts`.
4. Set the primary key as `id` with type `String`.
5. Add an initial item with `id` set to `0` and `views` set to `0`.

## Step 2: Create a Lambda Function

1. Open the AWS Management Console.
2. Navigate to Lambda.
3. Create a new Lambda function named `VisitorCountFunction`.
4. Set the runtime to Python 3.x.
5. Use the code from `lambda.py` for the Lambda function.
6. Configure the Lambda function with an execution role that has access to DynamoDB.

## Step 3: Set Up API Gateway

1. Open the AWS Management Console.
2. Navigate to API Gateway.
3. Create a new API.
4. Create a new resource named `visitors`.
5. Create a new GET method for the `visitors` resource.
6. Integrate the GET method with the Lambda function `VisitorCountFunction`.
7. Enable CORS for the GET method.
8. Add a mapping template for the GET method to pass query string parameters to the Lambda function:

    ```json
    {
        "queryStringParameters": {
            "count": "$input.params('count')"
        }
    }
    ```

9. Deploy the API to a stage (e.g., `prod`).

## Step 4: Implement Client-Side Code

1. Add the code from `visitorcount.js` to your website to track unique visitors.
2. Ensure you have an HTML element with `id="visitors"` where the count will be displayed:

    ```html
    <div id="visitors"></div>
    ```

## Step 5: Test the Implementation

1. Open your website in a browser.
2. Verify that the visitor count is displayed and increments for unique visitors.
3. Check that the count does not increment for returning visitors.