---
title: How to write a file to S3
author: Marcelo Carmona
layout: post
lang: en
ref: how-to-write-a-file-to-s3
permalink: how-to-write-a-file-to-s3
path: 2019-10-01-how-to-write-a-file-to-s3.md
tags:
  - Python
  - Aws
---

In boto3:

```python
import boto3

# Method 1: Object.put()
binary_data = b'Here we have some data'

s3 = boto3.resource('s3')
object = s3.Object('bucket_name', 'my/key/including/filename.txt')
object.put(Body=binary_data)

# Method 2: Client.put_object()
more_binary_data = b'Here we have some more data'

client = boto3.client('s3')
client.put_object(Body=more_binary_data, Bucket='bucket_name', Key='my/key/including/anotherfilename.txt')
```
