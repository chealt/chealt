# Start with an AWS provided image that is ready to use with Lambda
FROM public.ecr.aws/lambda/nodejs:14-x86_64

# Allow AWS credentials to be supplied when building this container locally for testing,
# so S3 can be accessed
ARG AWS_ACCESS_KEY_ID
ARG AWS_SECRET_ACCESS_KEY
ARG AWS_REGION=eu-central-1

# Install Chrome to get all of the dependencies installed
ADD https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm chrome.rpm
RUN yum install -y ./chrome.rpm

ENV AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID
ENV AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY
ENV AWS_REGION=$AWS_REGION

COPY package.json ${LAMBDA_TASK_ROOT}/

RUN npm install
COPY src/* ${LAMBDA_TASK_ROOT}/

# Lambda handler path
CMD [ "index.handler" ]
