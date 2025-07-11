FROM mcr.microsoft.com/devcontainers/php:8.2-bookworm

# use this Dockerfile to install additional tools you might need, e.g.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#     && apt-get -y install --no-install-recommends <your-package-list-here>

COPY --from=ghcr.io/mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions mysqli exif imagick zip gd intl