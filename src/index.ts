import {BrOperations} from "./BrOperations";
import * as core from '@actions/core';
import {ApiClient} from "./ApiClient";

function initBrOperations(brcStack: string) {
    const config = {
        baseURL: `https://api.${brcStack}.bloomreach.cloud`,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        timeout: 1000 * 120,
        timeoutErrorMessage: "Timeout Error! The time limit of 2 minutes was exceeded."
    }

    const apiClient = new ApiClient(config)
    return new BrOperations(apiClient)
}

async function uploadDistribution() {
    try {
        const brcStack = core.getInput('brcStack', {required: true})
        const username = core.getInput('username', {required: true})
        const password = core.getInput('password', {required: true})
        const distPath = core.getInput('distPath', {required: true})

        const brOperations = initBrOperations(brcStack)

        core.info('Start login process');
        const accessToken = await brOperations.login(username, password);
        core.info('Login process finished with success');

        core.info('Start uploading process');
        const distId = await brOperations.uploadDistribution(distPath, accessToken)
        core.setOutput('distId', distId);
        core.info(`Finished uploading process. DistributionID = ${distId}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

uploadDistribution()
    .then(() =>  core.info("Finished action"))
    .catch((error) => {
        core.setFailed(error.message);
    })