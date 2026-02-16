const threadLifecycle = {
  id: "thread-lifecycle",
  title: "Thread Lifecycle",
  description: "Learn about thread states and lifecycle",
  content: `# Thread Lifecycle

## Thread States

1. **NEW**: Thread created but not started
2. **RUNNABLE**: Ready to run or running
3. **BLOCKED**: Waiting for monitor lock
4. **WAITING**: Waiting indefinitely
5. **TIMED_WAITING**: Waiting for specified time
6. **TERMINATED**: Execution completed

## State Transitions

\`\`\`
NEW → RUNNABLE → TERMINATED
         ↓↑
    BLOCKED/WAITING/TIMED_WAITING
\`\`\`
  `,
  code: `public class ThreadLifecycleDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== Thread Lifecycle Demo ===\\n");
        
        Object lock = new Object();
        
        Thread thread = new Thread(() -> {
            System.out.println("Thread started");
            
            // TIMED_WAITING state
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {}
            
            // BLOCKED state (waiting for lock)
            synchronized(lock) {
                System.out.println("Thread acquired lock");
            }
            
            System.out.println("Thread ending");
        });
        
        // NEW state
        System.out.println("After creation: " + thread.getState());
        
        thread.start();
        
        // RUNNABLE state
        System.out.println("After start: " + thread.getState());
        
        Thread.sleep(100);
        // TIMED_WAITING state
        System.out.println("During sleep: " + thread.getState());
        
        // Acquire lock to make thread BLOCKED
        synchronized(lock) {
            Thread.sleep(600);
            System.out.println("While blocked: " + thread.getState());
        }
        
        thread.join();
        
        // TERMINATED state
        System.out.println("After completion: " + thread.getState());
        
        // Demonstrating WAITING state
        System.out.println("\\n--- WAITING State Demo ---");
        Thread waitingThread = new Thread(() -> {
            synchronized(lock) {
                try {
                    lock.wait();
                } catch (InterruptedException e) {}
            }
        });
        
        waitingThread.start();
        Thread.sleep(100);
        System.out.println("Waiting thread state: " + waitingThread.getState());
        
        // Notify to release
        synchronized(lock) {
            lock.notify();
        }
        waitingThread.join();
    }
}`,
  practiceQuestions: [
    {
      question: "Create a program that demonstrates all thread states",
      hint: "Use sleep for TIMED_WAITING, synchronized for BLOCKED, wait for WAITING",
      starterCode: `public class Main {
    public static void main(String[] args) throws InterruptedException {
        // Demonstrate all thread states
        
    }
}`
    }
  ]
};

export default threadLifecycle;





