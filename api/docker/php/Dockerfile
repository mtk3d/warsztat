FROM php:7.2-fpm
RUN docker-php-ext-install mysqli pdo_mysql
RUN docker-php-ext-configure opcache --enable-opcache \
    && docker-php-ext-install opcache

# Copy configuration
COPY config/opcache.ini $PHP_INI_DIR/conf.d/
COPY config/www.conf $PHP_INI_DIR/../php-fpm/