import Foundation

class LogSyncerManager {
    private static let serialQueue = DispatchQueue(label: "com.expensify.logsyncer.serial")
    
    static func addLog(_ logLine: String) {
        // Process log line
    }
    
    static func sendLogPacket(_ packet: [String: Any]) {
        // Avoid re-entrant JSC lock by dispatching to serial queue
        serialQueue.async {
            YAPLJS.callFunction("LogSyncerManager.sendLogPacket", args: [packet])
        }
    }
}