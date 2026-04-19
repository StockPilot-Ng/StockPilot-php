<template>
    <SuperAdminPageHeader>
        <template #header>
            <a-page-header :title="$t('payment_settings.flutterwave_settings')" class="p-0" />
        </template>
        <template #breadcrumb>
            <a-breadcrumb>
                <a-breadcrumb-item>
                    <router-link :to="{ name: 'superadmin.dashboard' }">
                        {{ $t("menu.dashboard") }}
                    </router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    {{ $t("menu.subscriptions") }}
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                    {{ $t("payment_settings.flutterwave_settings") }}
                </a-breadcrumb-item>
            </a-breadcrumb>
        </template>
    </SuperAdminPageHeader>

    <a-row>
        <a-col :xs="24" :sm="24" :md="24" :lg="4" :xl="4" class="bg-setting-sidebar">
            <SubscriptionSidebar />
        </a-col>
        <a-col :xs="24" :sm="24" :md="24" :lg="20" :xl="20">
            <a-card class="page-content-container">
                <a-form layout="vertical">
                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="24" :md="12" :lg="12">
                            <a-form-item
                                :label="$t('payment_settings.flutterwave_status')"
                                name="flutterwave_status"
                                :help="rules.flutterwave_status ? rules.flutterwave_status.message : null"
                                :validateStatus="rules.flutterwave_status ? 'error' : null"
                                class="required"
                            >
                                <a-switch
                                    v-model:checked="formData.flutterwave_status"
                                    checkedValue="active"
                                    unCheckedValue="inactive"
                                />
                            </a-form-item>
                        </a-col>
                    </a-row>

                    <template v-if="formData.flutterwave_status == 'active'">
                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="24" :md="12" :lg="12">
                                <a-form-item
                                    :label="$t('payment_settings.flutterwave_public_key')"
                                    name="flutterwave_public_key"
                                    :help="
                                        rules.flutterwave_public_key
                                            ? rules.flutterwave_public_key.message
                                            : null
                                    "
                                    :validateStatus="
                                        rules.flutterwave_public_key ? 'error' : null
                                    "
                                    class="required"
                                >
                                    <a-input
                                        v-model:value="formData.flutterwave_public_key"
                                        :placeholder="
                                            $t('common.placeholder_default_text', [
                                                $t('payment_settings.flutterwave_public_key'),
                                            ])
                                        "
                                    />
                                </a-form-item>
                            </a-col>
                            <a-col :xs="24" :sm="24" :md="12" :lg="12">
                                <a-form-item
                                    :label="$t('payment_settings.flutterwave_secret_key')"
                                    name="flutterwave_secret_key"
                                    :help="
                                        rules.flutterwave_secret_key
                                            ? rules.flutterwave_secret_key.message
                                            : null
                                    "
                                    :validateStatus="
                                        rules.flutterwave_secret_key ? 'error' : null
                                    "
                                    class="required"
                                >
                                    <a-input
                                        v-model:value="formData.flutterwave_secret_key"
                                        :placeholder="
                                            $t('common.placeholder_default_text', [
                                                $t('payment_settings.flutterwave_secret_key'),
                                            ])
                                        "
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>

                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="24" :md="24" :lg="24">
                                <a-form-item
                                    :label="
                                        $t('payment_settings.flutterwave_webhook_secret_hash')
                                    "
                                    name="flutterwave_webhook_secret_hash"
                                    :help="
                                        rules.flutterwave_webhook_secret_hash
                                            ? rules.flutterwave_webhook_secret_hash.message
                                            : null
                                    "
                                    :validateStatus="
                                        rules.flutterwave_webhook_secret_hash ? 'error' : null
                                    "
                                    class="required"
                                >
                                    <a-input
                                        v-model:value="formData.flutterwave_webhook_secret_hash"
                                        :placeholder="
                                            $t('common.placeholder_default_text', [
                                                $t(
                                                    'payment_settings.flutterwave_webhook_secret_hash'
                                                ),
                                            ])
                                        "
                                    />
                                </a-form-item>
                            </a-col>
                        </a-row>

                        <a-row :gutter="16">
                            <a-col :xs="24" :sm="24" :md="12" :lg="12">
                                <a-form-item
                                    :label="$t('payment_settings.webhook_url')"
                                    name="webhook_url"
                                >
                                    <a-typography-text type="success">
                                        {{ webhookUrl }}
                                    </a-typography-text>
                                </a-form-item>
                            </a-col>
                        </a-row>
                    </template>

                    <a-row :gutter="16">
                        <a-col :xs="24" :sm="24" :md="24" :lg="24">
                            <a-form-item>
                                <a-button
                                    type="primary"
                                    @click="onSubmit"
                                    :loading="loading"
                                >
                                    <template #icon> <SaveOutlined /> </template>
                                    {{ $t("common.update") }}
                                </a-button>
                            </a-form-item>
                        </a-col>
                    </a-row>
                </a-form>
            </a-card>
        </a-col>
    </a-row>
</template>
<script>
import { onMounted, ref } from "vue";
import { SaveOutlined } from "@ant-design/icons-vue";
import { useI18n } from "vue-i18n";
import apiAdmin from "../../../../common/composable/apiAdmin";
import SuperAdminPageHeader from "../../../layouts/SuperAdminPageHeader.vue";
import SubscriptionSidebar from "../SubscriptionSidebar.vue";

export default {
    components: {
        SaveOutlined,
        SubscriptionSidebar,
        SuperAdminPageHeader,
    },
    setup() {
        const { addEditRequestAdmin, loading, rules } = apiAdmin();
        const { t } = useI18n();
        const formData = ref({});
        const webhookUrl = ref("");

        onMounted(() => {
            axiosAdmin.get("superadmin/payment-settings/flutterwave").then((response) => {
                formData.value = response.data.data;
                webhookUrl.value = response.data.webhook_url;
            });
        });

        const onSubmit = () => {
            addEditRequestAdmin({
                url: `superadmin/payment-settings/flutterwave/update`,
                data: formData.value,
                successMessage: t("payment_settings.credential_saved"),
                success: (res) => {},
            });
        };

        return {
            loading,
            rules,
            formData,
            webhookUrl,

            onSubmit,
        };
    },
};
</script>
