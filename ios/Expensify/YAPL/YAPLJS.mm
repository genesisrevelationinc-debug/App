
+ (JSValue *)callFunction:(NSString *)functionName args:(NSArray *)args
{
    // Detect and prevent re-entrant JSC calls from the same thread
    static thread_local BOOL isInJSCCall = NO;
    if (isInJSCCall) {
        @throw [NSException exceptionWithName:@"YAPLJSReentrantCallException" reason:@"Re-entrant JSC call detected" userInfo:nil];
    }
    
    isInJSCCall = YES;
    @try {
        JSContext *context = [self sharedContext];
        JSValue *function = context[functionName];
        JSValue *result = [function callWithArguments:args];
        return result;
    } @finally {
        isInJSCCall = NO;
    }
}

@end