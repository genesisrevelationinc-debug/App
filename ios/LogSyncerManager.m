//
//  LogSyncerManager.m
//  Expensify
//
//  Created by Fixes on deadlock issue
//

#import "LogSyncerManager.h"
#import "YAPLJS.h"

@implementation LogSyncerManager

- (void)sendLogPacket {
    // Fix for recursive JSC lock contention - dispatch JS calls to avoid deadlock
    dispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_DEFAULT, 0), ^{
        // Perform the JS call on a background queue to avoid recursive locking
        [YAPLJS callFunction:@"handleLogPacket" args:@[]];
    });
}

@end