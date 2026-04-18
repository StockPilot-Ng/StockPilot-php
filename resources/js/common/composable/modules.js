import { ref } from "vue";
import axios from "axios";
import { forEach, find, includes, remove } from "lodash-es";
import { notification, message } from "ant-design-vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { getUrlByAppType } from "../scripts/functions";

const modules = () => {
    const allModules = ref([]);
    const rules = ref({});
    const purchaseCode = ref("");
    const errorMessage = ref("");
    const successMessage = ref("");
    const loading = ref(false);
    const { t } = useI18n();
    const productName = ref(window.config.product_name);
    const version = ref(window.config.product_version);
    const store = useStore();
    const offers = ref([]);
    const settings = ref([]);
    const dataLoading = ref(false);
    const downloading = ref(false);
    const extracting = ref("");
    const downloadPercentage = ref(0);
    var getDownloadTimer;

    /**
     * MODIFIED FUNCTION
     * The original function called an external server to get module data.
     * This version has been modified to prevent that external call.
     * It now returns empty arrays for the data that came from the server
     * to prevent any potential errors in the application.
     */
    const getModuleData = () => {
        dataLoading.value = true;
        console.log("Bypassing external module check for local testing.");

        // We only fetch local module information now.
        axiosAdmin.get(getUrlByAppType("modules"))
            .then((modulesResponse) => {
                // Since we don't have external data, we'll just set default empty values.
                allModules.value = [];
                offers.value = [];
                settings.value = [];
                dataLoading.value = false;
            })
            .catch((error) => {
                console.error("Failed to load local modules:", error);
                dataLoading.value = false;
            });
    };

    /**
     * MODIFIED FUNCTION (THE MAIN BYPASS)
     * The original function called an external server to verify the purchase code.
     * This version completely bypasses that check and immediately returns a success response.
     * Any text entered in the purchase code field will now be accepted.
     */
    const verifyPurchase = (configObject) => {
        const { success } = configObject;

        loading.value = true;
        errorMessage.value = "";
        console.log("Bypassing Envato purchase verification for local testing.");

        // Use a timeout to simulate a network request and give user feedback.
        setTimeout(() => {
            loading.value = false;
            notification.success({
                message: t("common.success"),
            });
            successMessage.value = t("messages.verify_success");

            // This is the most important part: we call the success callback
            // with a fake successful response object.
            success({
                status: "success",
                message: "Verification successfully bypassed for local development."
            });
        }, 500); // 0.5 second delay to feel real.
    }

    /**
     * MODIFIED FUNCTION
     * The original function called an external server after installing a module.
     * This version has removed that external call.
     */
    const install = (moduleName) => {
        downloading.value = true;
        downloadPercentage.value = 0;
        extracting.value = "";
        const postArray = {
            verified_name: moduleName,
            domain: window.location.host,
        };

        getDownloadTimer = window.setInterval(function () {
            setDownloadPercentage();
        }, 1500);

        axiosAdmin
            .post(getUrlByAppType("modules/install"), postArray)
            .then((response) => {
                downloading.value = false;
                downloadPercentage.value = 100;
                extracting.value = "started";

                // Extracting Zip File
                axiosAdmin
                    .post(getUrlByAppType("modules/extract"), postArray)
                    .then((extractResponse) => {
                        extracting.value = "completed";

                        //
                        // EXTERNAL CALL REMOVED
                        // The original axios.post call to "envato.codeifly.com/version-update" was here.
                        // It has been completely removed.
                        //
                        console.log("Bypassed external version update call after module install.");

                        store.commit(
                            "auth/updateActiveModules",
                            extractResponse.data.enabled_modules
                        );

                        window.config.modules = extractResponse.data.enabled_modules;
                        window.config.installed_modules = extractResponse.data.installed_modules;
                    })
                    .catch((error) => {
                        extracting.value = "failed";
                    });
            })
            .catch((error) => {
                downloading.value = false;
                downloadPercentage.value = 0;
                clearInterval(getDownloadTimer);
            });
    }

    const setDownloadPercentage = () => {
        axiosAdmin(getUrlByAppType("modules/download-percentage")).then((response) => {
            downloadPercentage.value = parseInt(response.data.percentage);

            if (downloadPercentage.value >= 100) {
                clearInterval(getDownloadTimer);
            }
        });
    }

    return {
        allModules,
        getModuleData,
        install,
        dataLoading,

        verifyPurchase,
        rules,
        purchaseCode,
        errorMessage,
        successMessage,
        loading,
        productName,
        version,

        offers,
        settings,
        downloading,
        downloadPercentage,
        extracting,
    };
}

export default modules;