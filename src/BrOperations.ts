import {ApiClient} from "./ApiClient";
import FormData from 'form-data';
import fs from 'fs'
import {AxiosRequestConfig} from "axios";

export class BrOperations {
    private apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient
    }

    async login(username: string, password: string) {
        console.log('Retrieve BRC access token.');
        const authURL = '/v3/authn/access_token';

        const response = await this.apiClient.post(
            authURL,
            {
                username,
                password,
            },
        );
        console.log('Received access token');

        const authResponse = response.data;
        return `Bearer ${authResponse.access_token}`
    }

    async uploadDistribution(distributionPath: string, accessToken: string): Promise<string> {
        console.log(`Upload distribution ${distributionPath} to BRC.`);

        const stream = fs.createReadStream(distributionPath);
        const formData = new FormData();
        formData.append('dist_file', stream);

        const uploadDistributionUrl = '/v3/distributions/'
        const config: AxiosRequestConfig = {
            headers: formData.getHeaders(),
            maxBodyLength: Number.POSITIVE_INFINITY,
            maxContentLength: Number.POSITIVE_INFINITY,
        };
        config.headers.Authorization = accessToken;

        const response = await this.apiClient.post(
            uploadDistributionUrl,
            formData,
            config,
        );
        console.log('Upload request completed.');
        return response.data.id;
    }
}