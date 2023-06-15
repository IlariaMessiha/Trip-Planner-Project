-- CreateTable
CREATE TABLE "attraction_review" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "body" TEXT,
    "rating" INTEGER,
    "user_id" INTEGER,
    "attraction_id" INTEGER,

    CONSTRAINT "attraction_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attraction_tag" (
    "id" SERIAL NOT NULL,
    "attraction_id" INTEGER,
    "tag_id" INTEGER,

    CONSTRAINT "attraction_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(255),
    "country_id" INTEGER,
    "city_code" VARCHAR(255),
    "long" DECIMAL(10,5),
    "lat" DECIMAL(10,5),
    "city_image" UUID,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "country" (
    "id" SERIAL NOT NULL,
    "country_code" VARCHAR(255),
    "label" VARCHAR(255),

    CONSTRAINT "country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_activity" (
    "id" SERIAL NOT NULL,
    "action" VARCHAR(45) NOT NULL,
    "user" UUID,
    "timestamp" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" VARCHAR(50),
    "user_agent" VARCHAR(255),
    "collection" VARCHAR(64) NOT NULL,
    "item" VARCHAR(255) NOT NULL,
    "comment" TEXT,
    "origin" VARCHAR(255),

    CONSTRAINT "directus_activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_collections" (
    "collection" VARCHAR(64) NOT NULL,
    "icon" VARCHAR(30),
    "note" TEXT,
    "display_template" VARCHAR(255),
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "singleton" BOOLEAN NOT NULL DEFAULT false,
    "translations" JSON,
    "archive_field" VARCHAR(64),
    "archive_app_filter" BOOLEAN NOT NULL DEFAULT true,
    "archive_value" VARCHAR(255),
    "unarchive_value" VARCHAR(255),
    "sort_field" VARCHAR(64),
    "accountability" VARCHAR(255) DEFAULT 'all',
    "color" VARCHAR(255),
    "item_duplication_fields" JSON,
    "sort" INTEGER,
    "group" VARCHAR(64),
    "collapse" VARCHAR(255) NOT NULL DEFAULT 'open',

    CONSTRAINT "directus_collections_pkey" PRIMARY KEY ("collection")
);

-- CreateTable
CREATE TABLE "directus_dashboards" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(30) NOT NULL DEFAULT 'dashboard',
    "note" TEXT,
    "date_created" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "user_created" UUID,
    "color" VARCHAR(255),

    CONSTRAINT "directus_dashboards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_fields" (
    "id" SERIAL NOT NULL,
    "collection" VARCHAR(64) NOT NULL,
    "field" VARCHAR(64) NOT NULL,
    "special" VARCHAR(64),
    "interface" VARCHAR(64),
    "options" JSON,
    "display" VARCHAR(64),
    "display_options" JSON,
    "readonly" BOOLEAN NOT NULL DEFAULT false,
    "hidden" BOOLEAN NOT NULL DEFAULT false,
    "sort" INTEGER,
    "width" VARCHAR(30) DEFAULT 'full',
    "translations" JSON,
    "note" TEXT,
    "conditions" JSON,
    "required" BOOLEAN DEFAULT false,
    "group" VARCHAR(64),
    "validation" JSON,
    "validation_message" TEXT,

    CONSTRAINT "directus_fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_files" (
    "id" UUID NOT NULL,
    "storage" VARCHAR(255) NOT NULL,
    "filename_disk" VARCHAR(255),
    "filename_download" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255),
    "type" VARCHAR(255),
    "folder" UUID,
    "uploaded_by" UUID,
    "uploaded_on" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_by" UUID,
    "modified_on" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "charset" VARCHAR(50),
    "filesize" BIGINT,
    "width" INTEGER,
    "height" INTEGER,
    "duration" INTEGER,
    "embed" VARCHAR(200),
    "description" TEXT,
    "location" TEXT,
    "tags" TEXT,
    "metadata" JSON,

    CONSTRAINT "directus_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_flows" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "icon" VARCHAR(30),
    "color" VARCHAR(255),
    "description" TEXT,
    "status" VARCHAR(255) NOT NULL DEFAULT 'active',
    "trigger" VARCHAR(255),
    "accountability" VARCHAR(255) DEFAULT 'all',
    "options" JSON,
    "operation" UUID,
    "date_created" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "user_created" UUID,

    CONSTRAINT "directus_flows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_folders" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "parent" UUID,

    CONSTRAINT "directus_folders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_migrations" (
    "version" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "timestamp" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "directus_migrations_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "directus_notifications" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(255) DEFAULT 'inbox',
    "recipient" UUID NOT NULL,
    "sender" UUID,
    "subject" VARCHAR(255) NOT NULL,
    "message" TEXT,
    "collection" VARCHAR(64),
    "item" VARCHAR(255),

    CONSTRAINT "directus_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_operations" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),
    "key" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "position_x" INTEGER NOT NULL,
    "position_y" INTEGER NOT NULL,
    "options" JSON,
    "resolve" UUID,
    "reject" UUID,
    "flow" UUID NOT NULL,
    "date_created" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "user_created" UUID,

    CONSTRAINT "directus_operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_panels" (
    "id" UUID NOT NULL,
    "dashboard" UUID NOT NULL,
    "name" VARCHAR(255),
    "icon" VARCHAR(30),
    "color" VARCHAR(10),
    "show_header" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "type" VARCHAR(255) NOT NULL,
    "position_x" INTEGER NOT NULL,
    "position_y" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "options" JSON,
    "date_created" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "user_created" UUID,

    CONSTRAINT "directus_panels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_permissions" (
    "id" SERIAL NOT NULL,
    "role" UUID,
    "collection" VARCHAR(64) NOT NULL,
    "action" VARCHAR(10) NOT NULL,
    "permissions" JSON,
    "validation" JSON,
    "presets" JSON,
    "fields" TEXT,

    CONSTRAINT "directus_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_presets" (
    "id" SERIAL NOT NULL,
    "bookmark" VARCHAR(255),
    "user" UUID,
    "role" UUID,
    "collection" VARCHAR(64),
    "search" VARCHAR(100),
    "layout" VARCHAR(100) DEFAULT 'tabular',
    "layout_query" JSON,
    "layout_options" JSON,
    "refresh_interval" INTEGER,
    "filter" JSON,
    "icon" VARCHAR(30) NOT NULL DEFAULT 'bookmark_outline',
    "color" VARCHAR(255),

    CONSTRAINT "directus_presets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_relations" (
    "id" SERIAL NOT NULL,
    "many_collection" VARCHAR(64) NOT NULL,
    "many_field" VARCHAR(64) NOT NULL,
    "one_collection" VARCHAR(64),
    "one_field" VARCHAR(64),
    "one_collection_field" VARCHAR(64),
    "one_allowed_collections" TEXT,
    "junction_field" VARCHAR(64),
    "sort_field" VARCHAR(64),
    "one_deselect_action" VARCHAR(255) NOT NULL DEFAULT 'nullify',

    CONSTRAINT "directus_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_revisions" (
    "id" SERIAL NOT NULL,
    "activity" INTEGER NOT NULL,
    "collection" VARCHAR(64) NOT NULL,
    "item" VARCHAR(255) NOT NULL,
    "data" JSON,
    "delta" JSON,
    "parent" INTEGER,

    CONSTRAINT "directus_revisions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_roles" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "icon" VARCHAR(30) NOT NULL DEFAULT 'supervised_user_circle',
    "description" TEXT,
    "ip_access" TEXT,
    "enforce_tfa" BOOLEAN NOT NULL DEFAULT false,
    "admin_access" BOOLEAN NOT NULL DEFAULT false,
    "app_access" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "directus_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_sessions" (
    "token" VARCHAR(64) NOT NULL,
    "user" UUID,
    "expires" TIMESTAMPTZ(6) NOT NULL,
    "ip" VARCHAR(255),
    "user_agent" VARCHAR(255),
    "share" UUID,
    "origin" VARCHAR(255),

    CONSTRAINT "directus_sessions_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "directus_settings" (
    "id" SERIAL NOT NULL,
    "project_name" VARCHAR(100) NOT NULL DEFAULT 'Directus',
    "project_url" VARCHAR(255),
    "project_color" VARCHAR(50),
    "project_logo" UUID,
    "public_foreground" UUID,
    "public_background" UUID,
    "public_note" TEXT,
    "auth_login_attempts" INTEGER DEFAULT 25,
    "auth_password_policy" VARCHAR(100),
    "storage_asset_transform" VARCHAR(7) DEFAULT 'all',
    "storage_asset_presets" JSON,
    "custom_css" TEXT,
    "storage_default_folder" UUID,
    "basemaps" JSON,
    "mapbox_key" VARCHAR(255),
    "module_bar" JSON,
    "project_descriptor" VARCHAR(100),
    "translation_strings" JSON,
    "default_language" VARCHAR(255) NOT NULL DEFAULT 'en-US',
    "custom_aspect_ratios" JSON,

    CONSTRAINT "directus_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_shares" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255),
    "collection" VARCHAR(64),
    "item" VARCHAR(255),
    "role" UUID,
    "password" VARCHAR(255),
    "user_created" UUID,
    "date_created" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "date_start" TIMESTAMPTZ(6),
    "date_end" TIMESTAMPTZ(6),
    "times_used" INTEGER DEFAULT 0,
    "max_uses" INTEGER,

    CONSTRAINT "directus_shares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_users" (
    "id" UUID NOT NULL,
    "first_name" VARCHAR(50),
    "last_name" VARCHAR(50),
    "email" VARCHAR(128),
    "password" VARCHAR(255),
    "location" VARCHAR(255),
    "title" VARCHAR(50),
    "description" TEXT,
    "tags" JSON,
    "avatar" UUID,
    "language" VARCHAR(255),
    "theme" VARCHAR(20) DEFAULT 'auto',
    "tfa_secret" VARCHAR(255),
    "status" VARCHAR(16) NOT NULL DEFAULT 'active',
    "role" UUID,
    "token" VARCHAR(255),
    "last_access" TIMESTAMPTZ(6),
    "last_page" VARCHAR(255),
    "provider" VARCHAR(128) NOT NULL DEFAULT 'default',
    "external_identifier" VARCHAR(255),
    "auth_data" JSON,
    "email_notifications" BOOLEAN DEFAULT true,

    CONSTRAINT "directus_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "directus_webhooks" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "method" VARCHAR(10) NOT NULL DEFAULT 'POST',
    "url" VARCHAR(255) NOT NULL,
    "status" VARCHAR(10) NOT NULL DEFAULT 'active',
    "data" BOOLEAN NOT NULL DEFAULT true,
    "actions" VARCHAR(100) NOT NULL,
    "collections" VARCHAR(255) NOT NULL,
    "headers" JSON,

    CONSTRAINT "directus_webhooks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel" (
    "id" SERIAL NOT NULL,
    "hotel_code" VARCHAR(255),
    "label" VARCHAR(255),
    "address" VARCHAR(255),
    "city_id" INTEGER,
    "phone" VARCHAR(255),
    "email" VARCHAR(255),
    "website" VARCHAR(255),
    "rating" INTEGER,
    "reservation_link" VARCHAR(255),
    "starting_from_price" DECIMAL(10,5),
    "long" DECIMAL(10,5),
    "lat" DECIMAL(10,5),
    "hotel_image" UUID,

    CONSTRAINT "hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_review" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "body" TEXT,
    "hotel_id" INTEGER,
    "rating" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "hotel_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hotel_tag" (
    "id" SERIAL NOT NULL,
    "hotel_id" INTEGER,
    "tag_id" INTEGER,

    CONSTRAINT "hotel_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255),
    "label" VARCHAR(255),
    "city_id" INTEGER,
    "address" VARCHAR(255),
    "phone" VARCHAR(255),
    "website" VARCHAR(255),
    "food" VARCHAR(255),
    "rating" INTEGER,
    "email" VARCHAR(255),
    "long" DECIMAL(10,5),
    "lat" DECIMAL(10,5),
    "avg_meal_per_person" DECIMAL(10,5),
    "retaurant_image" UUID,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_review" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "body" TEXT,
    "restaurant_id" INTEGER,
    "rating" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "restaurant_review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tag" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(255),
    "label" VARCHAR(255),

    CONSTRAINT "tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(255),
    "user_id" INTEGER,
    "arrival_date" TIMESTAMP(6),
    "departure_date" DATE,
    "trip_code" VARCHAR(255),

    CONSTRAINT "trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trip_item" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(6),
    "restaurant_id" INTEGER,
    "trip_id" INTEGER,
    "attraction_id" INTEGER,

    CONSTRAINT "trip_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "firstname" VARCHAR(255),
    "lastname" VARCHAR(255),
    "password" VARCHAR(255),
    "email" VARCHAR(255),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attraction" (
    "id" SERIAL NOT NULL,
    "label" VARCHAR(255),
    "city_id" INTEGER,
    "address" VARCHAR(255),
    "phone" VARCHAR(255),
    "suggested_duration" INTEGER,
    "openning_hours_from" TIME(6),
    "openning_hours_to" TIME(6),
    "about" TEXT,
    "website" VARCHAR(255),
    "type" VARCHAR(255),
    "details" TEXT,
    "rating" INTEGER,
    "reservation_link" VARCHAR(255),
    "min_age" INTEGER,
    "code" VARCHAR(255),
    "email" VARCHAR(255),
    "long" DECIMAL(10,5),
    "lat" DECIMAL(10,5),
    "entry_fee" DECIMAL(10,5),
    "image" UUID,

    CONSTRAINT "attraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant_tag" (
    "id" SERIAL NOT NULL,
    "restaurant_id" INTEGER,
    "tag_id" INTEGER,

    CONSTRAINT "restaurant_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_attraction" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "attraction_id" INTEGER,

    CONSTRAINT "user_attraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_restaurant" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "restaurant_id" INTEGER,

    CONSTRAINT "user_restaurant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attraction_review" ADD CONSTRAINT "attraction_review_attraction_id_foreign" FOREIGN KEY ("attraction_id") REFERENCES "attraction"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "attraction_review" ADD CONSTRAINT "attraction_review_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "attraction_tag" ADD CONSTRAINT "attraction_tag_attraction_id_foreign" FOREIGN KEY ("attraction_id") REFERENCES "attraction"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "attraction_tag" ADD CONSTRAINT "attraction_tag_tag_id_foreign" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_city_image_foreign" FOREIGN KEY ("city_image") REFERENCES "directus_files"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_country_id_foreign" FOREIGN KEY ("country_id") REFERENCES "country"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_collections" ADD CONSTRAINT "directus_collections_group_foreign" FOREIGN KEY ("group") REFERENCES "directus_collections"("collection") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_dashboards" ADD CONSTRAINT "directus_dashboards_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_files" ADD CONSTRAINT "directus_files_folder_foreign" FOREIGN KEY ("folder") REFERENCES "directus_folders"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_files" ADD CONSTRAINT "directus_files_modified_by_foreign" FOREIGN KEY ("modified_by") REFERENCES "directus_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_files" ADD CONSTRAINT "directus_files_uploaded_by_foreign" FOREIGN KEY ("uploaded_by") REFERENCES "directus_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_flows" ADD CONSTRAINT "directus_flows_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_folders" ADD CONSTRAINT "directus_folders_parent_foreign" FOREIGN KEY ("parent") REFERENCES "directus_folders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_notifications" ADD CONSTRAINT "directus_notifications_recipient_foreign" FOREIGN KEY ("recipient") REFERENCES "directus_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_notifications" ADD CONSTRAINT "directus_notifications_sender_foreign" FOREIGN KEY ("sender") REFERENCES "directus_users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_operations" ADD CONSTRAINT "directus_operations_flow_foreign" FOREIGN KEY ("flow") REFERENCES "directus_flows"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_operations" ADD CONSTRAINT "directus_operations_reject_foreign" FOREIGN KEY ("reject") REFERENCES "directus_operations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_operations" ADD CONSTRAINT "directus_operations_resolve_foreign" FOREIGN KEY ("resolve") REFERENCES "directus_operations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_operations" ADD CONSTRAINT "directus_operations_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_panels" ADD CONSTRAINT "directus_panels_dashboard_foreign" FOREIGN KEY ("dashboard") REFERENCES "directus_dashboards"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_panels" ADD CONSTRAINT "directus_panels_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_permissions" ADD CONSTRAINT "directus_permissions_role_foreign" FOREIGN KEY ("role") REFERENCES "directus_roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_presets" ADD CONSTRAINT "directus_presets_role_foreign" FOREIGN KEY ("role") REFERENCES "directus_roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_presets" ADD CONSTRAINT "directus_presets_user_foreign" FOREIGN KEY ("user") REFERENCES "directus_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_revisions" ADD CONSTRAINT "directus_revisions_activity_foreign" FOREIGN KEY ("activity") REFERENCES "directus_activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_revisions" ADD CONSTRAINT "directus_revisions_parent_foreign" FOREIGN KEY ("parent") REFERENCES "directus_revisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_sessions" ADD CONSTRAINT "directus_sessions_share_foreign" FOREIGN KEY ("share") REFERENCES "directus_shares"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_sessions" ADD CONSTRAINT "directus_sessions_user_foreign" FOREIGN KEY ("user") REFERENCES "directus_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_settings" ADD CONSTRAINT "directus_settings_project_logo_foreign" FOREIGN KEY ("project_logo") REFERENCES "directus_files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_settings" ADD CONSTRAINT "directus_settings_public_background_foreign" FOREIGN KEY ("public_background") REFERENCES "directus_files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_settings" ADD CONSTRAINT "directus_settings_public_foreground_foreign" FOREIGN KEY ("public_foreground") REFERENCES "directus_files"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_settings" ADD CONSTRAINT "directus_settings_storage_default_folder_foreign" FOREIGN KEY ("storage_default_folder") REFERENCES "directus_folders"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_shares" ADD CONSTRAINT "directus_shares_collection_foreign" FOREIGN KEY ("collection") REFERENCES "directus_collections"("collection") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_shares" ADD CONSTRAINT "directus_shares_role_foreign" FOREIGN KEY ("role") REFERENCES "directus_roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_shares" ADD CONSTRAINT "directus_shares_user_created_foreign" FOREIGN KEY ("user_created") REFERENCES "directus_users"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "directus_users" ADD CONSTRAINT "directus_users_role_foreign" FOREIGN KEY ("role") REFERENCES "directus_roles"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hotel" ADD CONSTRAINT "hotel_city_id_foreign" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hotel" ADD CONSTRAINT "hotel_hotel_image_foreign" FOREIGN KEY ("hotel_image") REFERENCES "directus_files"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hotel_review" ADD CONSTRAINT "hotel_review_hotel_id_foreign" FOREIGN KEY ("hotel_id") REFERENCES "hotel"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hotel_review" ADD CONSTRAINT "hotel_review_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hotel_tag" ADD CONSTRAINT "hotel_tag_hotel_id_foreign" FOREIGN KEY ("hotel_id") REFERENCES "hotel"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "hotel_tag" ADD CONSTRAINT "hotel_tag_tag_id_foreign" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_city_id_foreign" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_retaurant_image_foreign" FOREIGN KEY ("retaurant_image") REFERENCES "directus_files"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restaurant_review" ADD CONSTRAINT "restaurant_review_restaurant_id_foreign" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restaurant_review" ADD CONSTRAINT "restaurant_review_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trip" ADD CONSTRAINT "trip_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trip_item" ADD CONSTRAINT "trip_item_attraction_id_foreign" FOREIGN KEY ("attraction_id") REFERENCES "attraction"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trip_item" ADD CONSTRAINT "trip_item_restaurant_id_foreign" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "trip_item" ADD CONSTRAINT "trip_item_trip_id_foreign" FOREIGN KEY ("trip_id") REFERENCES "trip"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "attraction" ADD CONSTRAINT "attraction_city_id_foreign" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "attraction" ADD CONSTRAINT "attraction_image_foreign" FOREIGN KEY ("image") REFERENCES "directus_files"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restaurant_tag" ADD CONSTRAINT "restaurant_tag_restaurant_id_foreign" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restaurant_tag" ADD CONSTRAINT "restaurant_tag_tag_id_foreign" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_attraction" ADD CONSTRAINT "user_attraction_attraction_id_foreign" FOREIGN KEY ("attraction_id") REFERENCES "attraction"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_attraction" ADD CONSTRAINT "user_attraction_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_restaurant" ADD CONSTRAINT "user_restaurant_restaurant_id_foreign" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_restaurant" ADD CONSTRAINT "user_restaurant_user_id_foreign" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
