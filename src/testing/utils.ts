import Spy = jasmine.Spy;

export function callCallback(callbackPosition: number, ...callbackArgs: any[]): Function {
    return (...args: any[]) => args[callbackPosition](...callbackArgs);
}

export function spy(method: any) {
    return <Spy>method;
}