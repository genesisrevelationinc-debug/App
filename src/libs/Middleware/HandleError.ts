import type {AxiosError} from 'axios';
import CONST from '@src/CONST';

/**
 * Handles errors from API requests and extracts meaningful error messages.
        return 'Unexpected error. Please try again later.';
    }
    
    // Handle status code 666 (approver account not found)
    if (error.response?.status === 666) {
        const data = error.response.data as Record<string, unknown> | undefined;
        return data?.message ? String(data.message) : CONST.API_ERROR.APPROVER_ACCOUNT_NOT_FOUND;
    }
    
    const data = error.response?.data as Record<string, unknown> | undefined;
    if.kr
    if (data?.message) {