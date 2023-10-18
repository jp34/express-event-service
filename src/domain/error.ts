
export class ConfigurationError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ConfigurationError.prototype);
    }
}

export class InvalidInputError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InvalidInputError.prototype);
    }
}

export class InvalidOperationError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InvalidOperationError.prototype);
    }
}

export class NonExistentResourceError extends Error {
    constructor(resourceType: string, searchParams: string) {
        super(`Resource does not exist: ${resourceType}${searchParams}`);
        Object.setPrototypeOf(this, NonExistentResourceError.prototype);
    }
}