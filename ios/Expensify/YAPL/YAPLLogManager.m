    // Format and commit log line
    NSString *formattedLog = [self formatLogLine:level message:message parameters:parameters tags:tags syncWithServer:syncWithServer isInsecure:isInsecure];
    
    // Avoid re-entrant JSC deadlock: dispatch LogSyncerManager call off main thread
    if ([NSThread isMainThread]) {
        dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
            [LogSyncerManager sendLogPacket:@{@"level": level, @"message": formattedLog, @"tags": tags}];
        });
    } else {
        [LogSyncerManager sendLogPacket:@{@"level": level, @"message": formattedLog, @"tags": tags}];
    }
}

@end