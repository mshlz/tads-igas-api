import { createParamDecorator } from 'routing-controllers';

export function SessionUser(options?: { required?: boolean }) {
    return createParamDecorator({
        required: options && options.required ? true : false,
        value: action => {
            const user = action.request['__user__']
            return user
        },
    });
}