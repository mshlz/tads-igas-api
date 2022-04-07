export function success(data: any, message?: string) {
    return {
        code: 200,
        message,
        data
    }
}