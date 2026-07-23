# 1. Use the official PHP 8.2 image with an Apache web server
FROM php:8.4-apache

# 2. Install system dependencies and PHP extensions needed for Laravel and MySQL
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-install pdo pdo_mysql

# 3. Enable Apache's mod_rewrite module (critical for Laravel routing)
RUN a2enmod rewrite

# 4. Change the Apache document root to Laravel's /public directory
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# 5. Grab Composer from its official Docker image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 6. Set the working directory inside the container
WORKDIR /var/www/html

# 7. Copy your entire Laravel project code into the container
COPY . .

# 8. Install Laravel's PHP dependencies (skipping dev tools for production)
RUN composer install --no-dev --optimize-autoloader

# 9. Set the correct permissions so Laravel can write logs and cache files
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
