const q=(prompt,options,answer,explanation,difficulty='Core',pattern='Concept')=>({prompt,options,answer,explanation,difficulty,pattern})
const topic=(id,number,label,count,make)=>({id,number,label,questions:Array.from({length:Math.min(count,10)},(_,i)=>({id:`m4-${id}-${i+1}`,number:i+1,...make(i,1)}))})

const intro=topic('intro','4.1','Linked-list foundations',50,(m,r)=>[
 q('Linked list kis se banti hai?',['Contiguous slots only','Nodes connected by references','Hash buckets only','Matrix rows'],'Nodes connected by references','Har node data aur link/reference field rakhta hai.','Foundation','Definition'),
 q('Singly linked list ke last node ka next?',['head','tail','None','itself always'],'None','Non-circular SLL end marker None hota hai.','Foundation','Termination'),
 q('Head kya represent karta hai?',['Last data','First node reference','Length only','Every node'],'First node reference','Empty list mein head normally None.','Foundation','Head'),
 q('Nodes contiguous memory mein hona required?',['Yes','No','Only circular','Only Python list'],'No','Links logical order preserve karte hain; physical locations scattered ho sakti hain.','Foundation','Memory model'),
 q('Node typically SLL mein kya store karta hai?',['data only','data + next','prev only','index table'],'data + next','Next successor node ka reference hai.','Foundation','Node anatomy'),
 q('Empty linked list ki standard condition?',['head==0 data','head is None','length negative','tail=head always'],'head is None','No first node exists.','Foundation','Empty state'),
 q('Random index access L[i] linked list mein?',['O(1)','O(log n)','O(i), worst O(n)','O(n²)'],'O(i), worst O(n)','Head se i links follow karne padte hain.','Core','Sequential access'),
 q('Per-node pointer overhead SLL mein?', ['No overhead','One next reference besides data','n references per node','Only length'],'One next reference besides data','Flexibility ke badle metadata memory lagti hai.','Core','Space'),
 q('Linked-list order ka source?', ['Memory address order','next/prev links','Sorted data','Indices array'],'next/prev links','Physical adjacency irrelevant; references logical chain define karte hain.','Core','Logical order'),
 q(`n=${10*r} nodes traversal ka time?`,['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','Each node once visit.','Core','Traversal')
][m])

const comparison=topic('compare','4.3','Linked lists vs arrays/lists',50,(m,r)=>[
 q('Frequent random index reads ke liye better typical structure?',['Linked list','Array/Python list','Both identical','Tree always'],'Array/Python list','Contiguous slot address gives O(1) indexing.','Foundation','Selection'),
 q('Known node ke baad insertion linked list mein cost?',['O(1)','O(log n)','O(n)','O(n²)'],'O(1)','Few references change; search cost excluded because node already known.','Core','Known-pointer nuance'),
 q('Position i par insert when only head given?', ['Always O(1)','O(i), worst O(n)','O(log n)','Impossible'],'O(i), worst O(n)','Position/predecessor locate karna sequential.','Core','Search + update'),
 q('Array middle insertion vs linked list known-position insertion?', ['Both shift','Array shifts; linked rewires','Linked shifts data','Both O(1) always'],'Array shifts; linked rewires','But linked position discovery may dominate.','Core','Trade-off'),
 q('Cache locality generally better kiski?', ['Linked list','Contiguous array','Same guaranteed','Circular only'],'Contiguous array','Nearby elements nearby memory slots; linked nodes scattered ho sakte hain.','Core','Locality'),
 q('Linked list ko dynamic kehne ka reason?', ['No memory','Nodes individually add/remove','Sorted automatically','No pointers'],'Nodes individually add/remove','Capacity-resize block ki need nahi, though allocator costs remain.','Foundation','Dynamic size'),
 q('Sorted linked list par binary search standard O(log n)?',['Yes','No, middle access linear','Only duplicates','Only even n'],'No, middle access linear','Halving comparisons enough nahi; midpoint reach cost include karo.','Core','Binary-search trap'),
 q('Overall n-node SLL space?', ['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','Each node data + constant link metadata.','Core','Space'),
 q('Deletion O(1) claim mein hidden prerequisite?', ['List sorted','Node/predecessor access known','Data numeric','Length even'],'Node/predecessor access known','SLL mein target ka predecessor link update karna hota hai.','Core','Prerequisite'),
 q('Best structure choice depends on?', ['Only n','Access/update workload and memory','Variable names','IDE'],'Access/update workload and memory','Random access, locality, insertion positions and overhead weigh karo.','Foundation','Trade-off')
][m])

const types=topic('types','4.4','Types of linked lists',50,(m,r)=>[
 q('Singly node links?', ['next only','prev only','prev+next','head only'],'next only','Forward traversal.','Foundation','SLL'),
 q('Circular singly last.next?', ['None','head','tail','previous'],'head','Cycle closes to first node.','Foundation','CSLL'),
 q('Doubly node fields?', ['data,next','data,prev,next','data only','head,tail'],'data,prev,next','Backward and forward traversal.','Foundation','DLL'),
 q('Non-circular DLL boundary invariant?', ['head.prev=None and tail.next=None','head.next=head','tail.prev=None','No tail'],'head.prev=None and tail.next=None','Ends terminate in opposite directions.','Core','DLL invariant'),
 q('Circular doubly invariants?', ['tail.next=head and head.prev=tail','both None','head.next=None','tail=head always'],'tail.next=head and head.prev=tail','Both directions cycle close.','Core','CDLL invariant'),
 q('Round-robin scheduling natural fit?', ['SLL only','Circular linked list','Array required','BST'],'Circular linked list','Last participant ke baad first automatically.','Foundation','Use case'),
 q('Backward traversal naturally supported?', ['SLL','DLL/CDLL','CSLL only','None'],'DLL/CDLL','prev links required.','Foundation','Traversal direction'),
 q('Most pointer/reference fields per node among types?', ['SLL','CSLL','DLL/CDLL','All same'],'DLL/CDLL','prev and next two links.','Core','Space overhead'),
 q('Circular traversal stop condition cannot be current is None kyun?', ['None immediately','Valid cycle never reaches None','Python error','Data missing'],'Valid cycle never reaches None','Return-to-start or counted nodes stop condition use karo.','Core','Termination'),
 q('One-node CDLL invariant?', ['next/prev None','node.next=node.prev=node','head absent','tail None'],'node.next=node.prev=node','Single node both circular links itself.','Core','Singleton')
][m])

const sllSetup=topic('sll-setup','4.5.1','SLL initial setup and traversal',60,(m,r)=>[
 q('Node constructor mein new node next initial value?', ['head','None','data','tail'],'None','Unlinked node ka successor abhi absent.','Foundation','Initialization'),
 q('SLL display loop update?', ['current=head each time','current=current.next','head=head.next always','current.prev'],'current=current.next','Chain forward progress.','Foundation','Traversal'),
 q('Traversal mein current update bhool gaye?', ['Correct','Infinite loop','List reverse','Node delete'],'Infinite loop','Same node repeatedly process hoga.','Core','Loop progress'),
 q('get_length without stored length cost?', ['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','All nodes count.','Core','Length'),
 q('Stored length field ka len query?', ['O(1)','O(n)','O(log n)','Unknown'],'O(1)','Mutation operations field consistently update karein.','Core','Metadata'),
 q('Empty display access head.data blindly?', ['Safe','AttributeError risk','Returns None','Creates node'],'AttributeError risk','head None case first handle.','Core','Empty edge'),
 q('SLL traversal direction?', ['Forward only','Backward only','Both without extra work','Random'],'Forward only','Only next reference.','Foundation','Direction'),
 q(`List ${r+2} nodes; current=head; current=current.next twice. Position?`,['0','1','2','last always'],'2','Each next one position forward.','Foundation','Pointer trace'),
 q('Head reassign karna list object ko?', ['Destroy always','First-node reference change','Sort','Copy all nodes'],'First-node reference change','Remaining nodes links se reachable/unreachable decide hote hain.','Core','Reachability'),
 q('Unreachable node Python mein eventually?', ['Guaranteed immediate delete','Garbage collection/reference counting may reclaim','Becomes head','Self-links'],'Garbage collection/reference counting may reclaim','Conceptually references detach; manual free Python code mein nahi.','Core','Python memory')
][m])

const sllInsert=topic('sll-insert','4.5B','SLL insertion',60,(m,r)=>[
 q('Insert beginning correct order?', ['head=node then node.next=head','node.next=head then head=node','tail=None','search first always'],'node.next=head then head=node','Old head reference lose hone se pehle save in node.next.','Core','Pointer order'),
 q('Empty SLL insert beginning after?', ['head None','head new node','node.next=head cycle','Error'],'head new node','New node only element, next None.','Foundation','Empty case'),
 q('Without tail pointer insert end?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(n)','Last node locate by traversal.','Core','Tail insertion'),
 q('With maintained tail pointer insert end?', ['O(1)','O(n)','O(log n)','Impossible'],'O(1)','tail.next=node; tail=node.','Core','Optimization'),
 q('Insert between q and p correct links?', ['q.next=p only','node.next=p; q.next=node','p.next=node only','head=None'],'node.next=p; q.next=node','New node successor p, predecessor q points new.','Core','Middle insertion'),
 q('Valid insertion positions length n?', ['0…n−1','0…n','1…n only','Any integer'],'0…n','Position n means append.','Core','Boundary'),
 q('Insert after known node x in SLL?', ['Need predecessor','node.next=x.next; x.next=node','Scan tail always','Change head only'],'node.next=x.next; x.next=node','Successor preserve before rewiring x.','Core','Known node'),
 q('Pointer update wrong order x.next=node; node.next=x.next creates?', ['Correct','node self-loop','Delete x','None'],'node self-loop','After first assignment x.next is node, so node.next becomes itself.','Practice','Update-order trap'),
 q('Position-based middle insertion overall?', ['O(1) always','O(n) search + O(1) rewiring','O(n²)','O(log n)'],'O(n) search + O(1) rewiring','Locate dominates.','Core','Decomposition'),
 q('Insert beginning length metadata?', ['Decrease','Increase once','Unchanged','Set zero'],'Increase once','Wrapper calls mein double increment avoid.','Core','Invariant')
][m])

const sllOps=topic('sll-ops','4.5C','SLL search, deletion and complexity',60,(m,r)=>[
 q('Absent key search worst time?', ['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','End/None reach after all nodes.','Core','Search'),
 q('Delete beginning non-empty?', ['head=head.next','tail=head','head=None always','Scan all'],'head=head.next','One reference update; O(1).','Foundation','Head deletion'),
 q('Delete end SLL without tail/predecessor?', ['O(1)','O(n)','O(log n)','Impossible'],'O(n)','Penultimate node locate. Tail pointer alone also predecessor nahi deta.','Core','End deletion'),
 q('Single-node delete end final state?', ['head same','head=None (and tail=None if stored)','cycle','two nodes'],'head=None (and tail=None if stored)','Empty invariant restore.','Core','Singleton'),
 q('Delete target node p in SLL when predecessor q known?', ['q.next=p.next','p.next=q','head=p','q=None'],'q.next=p.next','Bypass p; optional p.next=None detach.','Core','Bypass'),
 q('Delete by position valid indices length n?', ['0…n','0…n−1','1…n','Any'],'0…n−1','Position n no existing node.','Core','Boundary'),
 q('Search sorted SLL generic worst?', ['O(log n)','O(n)','O(1)','O(n²)'],'O(n)','Sequential access; can early stop but worst linear.','Core','Sorted search'),
 q('Traversal auxiliary space iterative?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','One current reference; nodes input storage.','Core','Space'),
 q('Recursive traversal stack space?', ['O(1)','O(n)','O(log n)','O(2ⁿ)'],'O(n)','One active call per node.','Core','Recursion space'),
 q('Delete only given pointer p in SLL possible general last node?', ['Always O(1)','Not general for last; predecessor needed','Always O(n²)','Only sorted'],'Not general for last; predecessor needed','Copy-next trick only non-tail and changes node identity semantics.','Practice','Deletion limitation')
][m])

const sllInsertBeginning=topic('sll-insert-beginning','4.5.2','SLL insertion at beginning',50,(m,r)=>[
 q('Beginning insertion ka correct order?', ['head=node; node.next=head','node.next=head; head=node','head.next=node','tail=node only'],'node.next=head; head=node','Old head ko node.next mein preserve karke head shift hota hai.','Core','Pointer order'),
 q('Empty SLL mein beginning insertion ke baad?', ['head None','head new node, node.next None','self-loop','error'],'head new node, node.next None','Old head None tha, so new node only node banta hai.','Foundation','Empty case'),
 q('Wrong order head=node; node.next=head ka result?', ['Correct list','Node self-loop','Old head tail','Sorted list'],'Node self-loop','Head first new node hua; node.next same node ko point karega.','Core','Self-loop trap'),
 q('Beginning insertion time complexity?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','Fixed reference updates; traversal nahi.','Foundation','Complexity'),
 q('Old list reachable rakhne wali first assignment?', ['head=None','node.next=head','head.next=node','node.data=head'],'node.next=head','New node old first node tak path preserve karta hai.','Core','Reachability'),
 q('List A→B mein X beginning par final chain?', ['A→X→B','X→A→B','X→X','B→A→X'],'X→A→B','X new head, X.next old A.','Foundation','Trace'),
 q('Head insertion ke baad kya point karta hai?', ['Old first','New first node','Tail','Length'],'New first node','Head always logical first-node reference.','Foundation','Head invariant'),
 q('Tail maintain ho aur empty list mein first insert?', ['Only head set','Head and tail both new node','Tail None forever','Tail old head'],'Head and tail both new node','Singleton mein head is tail.','Core','Tail boundary'),
 q('Length metadata successful insert par?', ['Decrease','Increase exactly once','Unchanged','Set zero'],'Increase exactly once','One new node list ka part bana.','Core','Metadata'),
 q('Five beginning insertions ki total cost?', ['O(1)','O(5), generally O(k)','O(n²)','O(log n)'],'O(5), generally O(k)','Each operation O(1); k operations O(k).','Practice','Repeated operations')
][m])

const sllInsertEnd=topic('sll-insert-end','4.5.3','SLL insertion at end',50,(m,r)=>[
 q('Only head stored ho toh end insertion worst time?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(n)','Last node locate karne ke liye traversal.','Core','Locate tail'),
 q('while current.next ke baad current kahan?', ['None','Last node','Head always','Second-last'],'Last node','Condition false when current.next None.','Core','Loop postcondition'),
 q('Empty list append mein?', ['Traverse None','head=new node and return','self-loop','invalid'],'head=new node and return','New node first/last both hai.','Foundation','Empty case'),
 q('Last node milne ke baad update?', ['head=node','current.next=new_node','new_node.next=head','current=None'],'current.next=new_node','Old tail new node ko successor banata hai.','Foundation','Rewire'),
 q('while current loop ke baad current?', ['Tail','None','Head','New node'],'None','Isliye current.next update nahi kar sakte.','Core','Loop condition trap'),
 q('Maintained tail ke saath append?', ['tail.next=node; tail=node','head=node only','node.next=tail','tail=None'],'tail.next=node; tail=node','Old tail connects new; tail shifts.','Core','Tail optimization'),
 q('Maintained tail append complexity?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','Direct last-node reference.','Foundation','Complexity'),
 q('Singleton A mein X append final?', ['X→A','A→X→None','A self-loop','Head None'],'A→X→None','A old tail, A.next X.','Foundation','Trace'),
 q('Tail pointer alone delete-end O(1)?', ['Yes always','No, predecessor unavailable','Only sorted','Only empty'],'No, predecessor unavailable','SLL backward link absent.','Core','Nuance'),
 q('n nodes, only head append visits?', ['0','1','Θ(n)','Θ(log n)'],'Θ(n)','Tail tak sequential walk.','Practice','Cost trace')
][m])

const sllInsertMiddle=topic('sll-insert-middle','4.5.4','SLL insertion in middle',50,(m,r)=>[
 q('Length n ke valid insertion positions?', ['0…n−1','0…n','1…n','Any'],'0…n','Position n append hai.','Core','Bounds'),
 q('Middle insertion mein q aur p?', ['q target','q predecessor, p old node at pos','Both None','Both tail'],'q predecessor, p old node at pos','New node q aur p ke beech.','Core','Two references'),
 q('q aur p known ho toh links?', ['q.next=node; node.next=p','node.next=q; p.next=node','q.next=p only','head=node'],'q.next=node; node.next=p','Chain q→new→p.','Core','Rewire'),
 q('Position 0 route?', ['End','Beginning insertion','Search','Delete'],'Beginning insertion','Head boundary.','Foundation','Boundary'),
 q('Position n route?', ['Beginning','End insertion','Invalid','Search'],'End insertion','Insert after tail.','Foundation','Boundary'),
 q('Position n+1?', ['Append','Invalid','Beginning','Self-loop'],'Invalid','Maximum n.','Foundation','Validation'),
 q('Predecessor already known rewire cost?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','Fixed references.','Core','Known node'),
 q('Only position given overall cost?', ['O(1)','O(n) locate + O(1) rewire','O(log n)','Impossible'],'O(n) locate + O(1) rewire','Locate dominates.','Core','Decomposition'),
 q('Old successor p preserve kyun?', ['Sorting','Remaining suffix reachable rahe','Length zero','Tail delete'],'Remaining suffix reachable rahe','Overwrite ke baad bhi chain available.','Core','Reachability'),
 q('Insertion aur deletion bounds same?', ['Yes','No: insert allows n, delete only n−1','Only DLL','Only circular'],'No: insert allows n, delete only n−1','Position n means append but no node to delete.','Practice','Bounds')
][m])

const sllSearch=topic('sll-search','4.5.5','SLL searching',50,(m,r)=>[
 q('SLL search kahan se start?', ['Tail','Head','Middle','Random'],'Head','Only forward links.','Foundation','Start'),
 q('Key equal milte hi?', ['Continue mandatory','Return first match','Delete','Reverse'],'Return first match','Implementation first occurrence reports.','Foundation','Match'),
 q('Absent key worst-case?', ['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','All nodes visit.','Core','Worst case'),
 q('Key head par best-case?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','First comparison.','Core','Best case'),
 q('Search loop progress?', ['current=head','current=current.next','head=current.next','current.prev'],'current=current.next','Agle node par move.','Foundation','Progress'),
 q('Empty search first?', ['head.data','Empty guard','Tail traverse','Create key'],'Empty guard','None dereference avoid.','Core','Empty edge'),
 q('Duplicate key, immediate return?', ['Last','First occurrence','All','Error'],'First occurrence','First equality par exit.','Core','Duplicates'),
 q('Sorted SLL standard search worst?', ['O(log n)','O(n)','O(1)','O(n²)'],'O(n)','Direct midpoint access nahi.','Core','Sorted nuance'),
 q('Iterative search auxiliary space?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','Few variables.','Core','Space'),
 q('Position i par key ke comparisons?', ['i','i+1','n²','0'],'i+1','Index 0 through i compare.','Practice','Trace')
][m])

const sllDeleteBeginning=topic('sll-delete-beginning','4.5.6','SLL deletion at beginning',50,(m,r)=>[
 q('Delete beginning core update?', ['head=head.next','tail=head','head=None always','scan tail'],'head=head.next','Second node new head.','Foundation','Head shift'),
 q('Empty list deletion?', ['head.data','Reject safely','Create node','Traverse'],'Reject safely','Target absent.','Foundation','Empty case'),
 q('Old head current mein save kyun?', ['Sort','Detach old node','Find tail','Count'],'Detach old node','Head shift ke baad reference available.','Core','Temporary ref'),
 q('current.next=None purpose?', ['Reconnect','Explicit detach','New head None','Cycle'],'Explicit detach','Removed node link clear.','Core','Detach'),
 q('Singleton delete beginning final head?', ['Same','None','Self-loop','Tail only'],'None','Only node removed.','Core','Singleton'),
 q('Tail maintained singleton deletion?', ['Old tail','Tail also None','No change','Tail=head.next'],'Tail also None','Empty invariant.','Core','Tail invariant'),
 q('Delete beginning time?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','Fixed updates.','Foundation','Complexity'),
 q('Length metadata successful delete?', ['Increase','Decrease once','Unchanged','Set -1'],'Decrease once','One node removed.','Core','Metadata'),
 q('A→B→C delete beginning?', ['A→C','B→C','C only','Empty'],'B→C','Head moves to B.','Foundation','Trace'),
 q('k beginning deletions total?', ['O(1)','O(k)','O(k²)','O(log k)'],'O(k)','Each O(1).','Practice','Repeated ops')
][m])

const sllDeleteEnd=topic('sll-delete-end','4.5.7','SLL deletion at end',50,(m,r)=>[
 q('Delete end mein p final?', ['Head','Last node','None','Second-last'],'Last node','p target.','Core','Target'),
 q('Delete end mein q final?', ['After p','Predecessor of p','Always None','Head only'],'Predecessor of p','q new tail.','Core','Predecessor'),
 q('Multi-node update?', ['q.next=None','p.next=q','head=p','tail.next=head'],'q.next=None','Penultimate becomes tail.','Foundation','Detach'),
 q('Singleton mein q?', ['Head','None','Tail.next','New'],'None','Loop zero times.','Core','Singleton'),
 q('Singleton delete-end update?', ['q.next=None','head=None','p.next=p','No-op'],'head=None','Avoid q None dereference.','Core','Boundary'),
 q('Only head delete-end time?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(n)','Penultimate locate.','Core','Complexity'),
 q('Tail alone sufficient O(1)?', ['Yes','No','Only even n','Only sorted'],'No','Need predecessor.','Core','Tail nuance'),
 q('DLL tail.prev delete-end?', ['O(1)','O(n)','O(log n)','Impossible'],'O(1)','Backward ref direct.','Core','Comparison'),
 q('A→B→C delete end?', ['A→C','A→B→None','B→C','Empty'],'A→B→None','B becomes tail.','Foundation','Trace'),
 q('n-node delete-end traversal?', ['Θ(1)','Θ(n)','Θ(log n)','Θ(n²)'],'Θ(n)','Penultimate tak walk.','Practice','Cost')
][m])

const sllDeleteMiddle=topic('sll-delete-middle','4.5.8','SLL deletion in middle',50,(m,r)=>[
 q('Length n valid deletion indices?', ['0…n','0…n−1','1…n','Any'],'0…n−1','Position n absent.','Core','Bounds'),
 q('Middle delete mein p?', ['Predecessor','Target node','Tail always','Head always'],'Target node','p position pos.','Core','Target'),
 q('Middle delete mein q?', ['Successor','Target predecessor','None always','Length'],'Target predecessor','q bypass link updates.','Core','Predecessor'),
 q('Core bypass?', ['q.next=p.next','p.next=q','head=p','q=None'],'q.next=p.next','Predecessor to successor.','Core','Bypass'),
 q('p.next=None purpose?', ['Delete suffix','Detach removed node','Cycle','Count'],'Detach removed node','Link clear.','Core','Detach'),
 q('Delete position 0 ko kis operation par route karna chahiye?', ['Delete beginning','Delete end','Invalid','Search'],'Delete beginning','Head boundary.','Foundation','Boundary'),
 q('Position n−1 route?', ['Beginning','Delete end','Invalid','Middle only'],'Delete end','Tail boundary.','Foundation','Boundary'),
 q('q and p already known rewire?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','Fixed bypass.','Core','Known refs'),
 q('Only position overall?', ['O(1)','O(n) locate + O(1) bypass','O(log n)','Impossible'],'O(n) locate + O(1) bypass','Traversal dominates.','Core','Decomposition'),
 q('Delete position n valid?', ['Yes','No','Only circular','Only DLL'],'No','Largest n−1.','Practice','Bounds')
][m])

const sllComplexity=topic('sll-complexity','4.5.9','SLL complexity analysis',50,(m,r)=>[
 q('n-node SLL traversal time?', ['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','Har node exactly once visit hota hai.','Foundation','Traversal'),
 q('Search key head par milne ka best case?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','First comparison ke baad return.','Foundation','Best case'),
 q('Absent key search worst case?', ['O(1)','O(log n)','O(n)','O(n²)'],'O(n)','None tak saare nodes scan.','Core','Worst case'),
 q('Insert beginning complexity?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','Fixed new.next and head updates.','Foundation','Insertion'),
 q('Only-head implementation mein insert end?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(n)','Last node locate karna padta hai.','Core','Insertion'),
 q('Position-based middle insertion total?', ['O(1) always','O(n) worst','O(log n)','O(n²)'],'O(n) worst','Locate O(n), link updates O(1).','Core','Locate plus rewire'),
 q('Delete beginning complexity?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','Head=head.next fixed update.','Foundation','Deletion'),
 q('Delete end SLL worst case?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(n)','Second-last node locate.','Core','Deletion'),
 q('Space per SLL node?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','Fixed data plus one next reference.','Core','Space'),
 q('Overall n-node SLL storage?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(n)','n constant-size nodes.','Core','Overall space')
][m])

const csll=topic('csll','4.6','Circular singly linked list',60,(m,r)=>[
 q('CSLL last.next?', ['None','head','tail','last'],'head','Circular invariant.','Foundation','Invariant'),
 q('Empty CSLL display?', ['do-while from None','Handle before dereference','Infinite required','Create node'],'Handle before dereference','head None cannot access data/next.','Core','Empty edge'),
 q('Traversal stop condition?', ['current is None','current returns to head','data zero','tail None'],'current returns to head','Cycle has no None end.','Core','Termination'),
 q('while current without circular stop?', ['Works once','Infinite loop for valid cycle','O(1)','Deletes nodes'],'Infinite loop for valid cycle','All node references truthy repeatedly.','Core','Infinite-loop trap'),
 q('One-node CSLL after insertion?', ['node.next=None','node.next=node','head=None','two nodes'],'node.next=node','Cycle closes to itself.','Core','Singleton'),
 q('Notebook CSLL insert beginning without tail cost?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(n)','Last node locate to update last.next.','Core','Implementation cost'),
 q('With tail pointer CSLL insert beginning?', ['O(1)','O(n)','Impossible','O(log n)'],'O(1)','node.next=head; tail.next=node; head=node.','Core','Optimization'),
 q('Count nodes algorithm initialization non-empty?', ['count=0,current=head.next only','count=1,current=head.next','count=n known only','Infinite'],'count=1,current=head.next','Head already counted, then until return.','Core','Counting'),
 q('Delete sole node?', ['head=head.next forever','head=None; tail=None if stored','keep self-loop','invalid'],'head=None; tail=None if stored','List becomes empty.','Core','Singleton deletion'),
 q('CSLL common application?', ['Binary search','Round robin','Matrix multiplication','Heap sort'],'Round robin','Cyclic successor natural.','Foundation','Use case')
][m])

const dll=topic('dll','4.7','Doubly linked list',60,(m,r)=>[
 q('DLL node extra field vs SLL?', ['length','prev','head','index'],'prev','Previous node reference backward traversal allows.','Foundation','Node anatomy'),
 q('Insert between q and p key invariants?', ['q.next=node,node.prev=q,node.next=p,p.prev=node','Only q.next','Only p.prev','head=None'],'q.next=node,node.prev=q,node.next=p,p.prev=node','Four directional relationships restore.','Core','Insertion'),
 q('Delete middle p when neighbors exist?', ['p.prev.next=p.next and p.next.prev=p.prev','Only p=None','head=tail','Swap data'],'p.prev.next=p.next and p.next.prev=p.prev','Both directions bypass p.','Core','Deletion'),
 q('DLL delete end with tail pointer?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','tail=tail.prev then tail.next=None.','Core','Tail deletion'),
 q('DLL insert end with tail?', ['O(1)','O(n)','O(log n)','Impossible'],'O(1)','No traversal.','Core','Tail insertion'),
 q('Position-based middle op only head/tail known?', ['O(1) always','O(n) locate, O(1) rewire','O(n²)','O(log n)'],'O(n) locate, O(1) rewire','Node search dominates.','Core','Known-node nuance'),
 q('Backward display starts?', ['head','tail','None','middle'],'tail','Follow prev until None.','Foundation','Backward traversal'),
 q('One-node DLL invariants?', ['head=tail=node; prev=next=None','head None','self-cycle required','tail.next=head'],'head=tail=node; prev=next=None','Non-circular singleton.','Core','Singleton'),
 q('Delete beginning multi-node must set?', ['new head.prev=None','tail.next=head','old head.prev=head','length zero'],'new head.prev=None','Backward dangling link remove.','Core','Boundary update'),
 q('DLL memory per node vs SLL?', ['Less','More by one reference','Same guaranteed','Zero'],'More by one reference','prev field extra overhead.','Foundation','Space trade-off')
][m])

const cdll=topic('cdll','4.8','Circular doubly linked list',60,(m,r)=>[
 q('CDLL boundary links?', ['head.prev=tail and tail.next=head','both None','head.next=None','tail.prev=None'],'head.prev=tail and tail.next=head','Doubly circular invariant.','Foundation','Invariant'),
 q('One-node CDLL?', ['next/prev None','next=prev=self','head None','two nodes'],'next=prev=self','Both directions return same node.','Core','Singleton'),
 q('Insert beginning with head/tail pointers cost?', ['O(1)','O(n)','O(log n)','O(n²)'],'O(1)','Four boundary links plus head update.','Core','Insertion'),
 q('Insert end with head/tail cost?', ['O(1)','O(n)','Impossible','O(log n)'],'O(1)','New node between old tail and head.','Core','Insertion'),
 q('Forward traversal stop?', ['None','back to head','back to tail before print always','data repeat'],'back to head','Circular next chain.','Core','Termination'),
 q('Backward traversal stop?', ['None','back to tail','head.next','length zero'],'back to tail','Start tail and follow prev cycle.','Core','Termination'),
 q('Delete beginning length>1 updates?', ['head=head.next; head.prev=tail; tail.next=head','head=None only','tail=tail.prev only','sort'],'head=head.next; head.prev=tail; tail.next=head','Both circular boundary links restore.','Core','Deletion'),
 q('Delete end length>1 updates?', ['tail=tail.prev; tail.next=head; head.prev=tail','head=head.next only','tail=None','reverse'],'tail=tail.prev; tail.next=head; head.prev=tail','Both directions close cycle.','Core','Deletion'),
 q('Middle deletion given node p?', ['O(1) rewiring','O(n) rewiring','Impossible','O(log n)'],'O(1) rewiring','p.prev.next and p.next.prev; finding p separate.','Core','Known-node nuance'),
 q('CDLL biggest cost trade-off?', ['No traversal','Extra pointer + complex invariants','Fixed size','No deletion'],'Extra pointer + complex invariants','Powerful bidirectional cycle but more update cases.','Foundation','Trade-off')
][m])

const coding=topic('coding','4.9','Lecture coding problems',60,(m,r)=>[
 q('Length n odd list middle index with zero-based n//2?', ['First','Floor middle','Last','Out of range'],'Floor middle','For odd n unique center.','Foundation','Middle'),
 q('Even n list n//2 selects?', ['First of two middles','Second of two middles','No middle','Last'],'Second of two middles','Example n=4 → index2; policy must be stated.','Core','Middle convention'),
 q('Fast/slow middle algorithm?', ['slow 2, fast1','slow1, fast2','both0','reverse'],'slow1, fast2','Fast end par, slow middle.','Core','Fast-slow'),
 q('Fast/slow middle time/space?', ['O(n)/O(1)','O(n)/O(n)','O(log n)/O(1)','O(n²)/O(1)'],'O(n)/O(1)','Single traversal with two references.','Core','Complexity'),
 q('Circular node count empty?', ['1','0','Infinite','None'],'0','Empty separately return 0.','Foundation','Counting'),
 q('Sum all nodes empty result natural identity?', ['0','None always','1','Error mandatory'],'0','Additive identity; contract can specify otherwise.','Foundation','Aggregation'),
 q('Max/min initialization non-empty linked list?', ['0 always','head.data','∞ only','tail.next'],'head.data','All-negative/all-positive safe.','Core','Initialization'),
 q('Max/min in one traversal time?', ['O(1)','O(n)','O(n²)','O(log n)'],'O(n)','Each node once, constant comparisons.','Core','Aggregation'),
 q('Notebook middle using stored length performs?', ['One pass total including known length','length metadata + n/2 walk','Random access','Binary search'],'length metadata + n/2 walk','If length maintained, one half traversal. Without it, count+walk two passes still O(n).','Core','Implementation'),
 q('Circular aggregation termination?', ['while curr','until curr returns head','until None','fixed 1 only'],'until curr returns head','Valid cycle has no None.','Core','Circular loop')
][m])

const gate=topic('gate-patterns','4.G','GATE pointer patterns',60,(m,r)=>[
 q('Floyd cycle detection pointer speeds?', ['1 and 2','1 and 3 only','both1','0 and1'],'1 and 2','If cycle, fast eventually meets slow.','Core','Cycle detection'),
 q('Floyd algorithm auxiliary space?', ['O(n)','O(1)','O(log n)','O(n²)'],'O(1)','Two pointers only.','Core','Space'),
 q('Reverse SLL iterative core update order?', ['curr.next=prev then advance using saved next','curr=curr.next then overwrite','head=None first','sort data'],'curr.next=prev then advance using saved next','Original successor save before reversing link.','Core','Reversal'),
 q('Iterative SLL reverse time/aux?', ['O(n)/O(1)','O(n)/O(n)','O(1)/O(n)','O(n²)/O(1)'],'O(n)/O(1)','Each node link once reversed; three references.','Core','Complexity'),
 q('Recursive reverse stack space?', ['O(1)','O(n)','O(log n)','O(2ⁿ)'],'O(n)','One call per node.','Core','Recursion'),
 q('Merge two sorted linked lists optimal time?', ['O(1)','O(n+m)','O(nm)','O(log n)'],'O(n+m)','Each node considered once; links can reuse nodes.','Core','Merge'),
 q('Cycle length find after slow/fast meet?', ['Walk one pointer until returns, count','Use array index only','Always n','Impossible'],'Walk one pointer until returns, count','One full cycle traversal.','Core','Cycle length'),
 q('Kth node from end one-pass pattern?', ['Two pointers gap k','Binary search','Sort','Recursion tree'],'Two pointers gap k','Advance fast k, then both until fast end.','Core','Gap pointers'),
 q('Intersection of two SLL by identity vs data?', ['Compare data only','Node object identity','Sort values','Count duplicates'],'Node object identity','Equal values do not mean shared physical suffix.','Practice','Intersection'),
 q('Dummy/sentinel node benefit?', ['Makes list circular always','Unifies head insertion/deletion cases','Removes all memory','Gives O(1) search'],'Unifies head insertion/deletion cases','Predecessor always available near logical head, fewer branches.','Core','Sentinel')
][m])

;[
 q('10→20→30→40→50→None mein standard 1-based k=2 from end?', ['30','40','50','20'],'40','End se counting: 50 first, 40 second. Fast ko exactly 2 nodes ahead karke verify hota hai.','Core','Gap trace'),
 q('Gap method mein k=length ho toh slow final kahan?', ['Head','Tail','None','Middle'],'Head','Fast k steps ke baad None; slow move nahi karta, so head length-th from end hai.','Core','Gap boundary'),
 q('Gap method mein k>length aur validation absent ho toh?', ['Correct head','Dereference error','Always tail','Cycle'],'Dereference error','Fast ko k steps move karte waqt None.next access ho sakta hai; k range validate karo.','Practice','Gap invalid k'),
 q('Even list 10→20→30→40 par slow/fast both head, condition fast and fast.next: returned middle?', ['20','30','40','None'],'30','Standard update slow=slow.next, fast=fast.next.next second middle return karta hai.','Core','Even middle'),
 q('First middle 20 chahiye for 4-node list: useful loop guard?', ['fast and fast.next','fast.next and fast.next.next','while slow','while head'],'fast.next and fast.next.next','Fast ko two-step move tabhi do jab uske baad bhi pair available ho; slow first middle par rukta hai.','Practice','First middle'),
 q('Cycle detection mein slow=fast=head ke turant baad equality check karna?', ['Correct cycle proof','False positive','Required','Tail detect'],'False positive','Initialization par equality natural hai; pehle pointers move hone chahiye, phir meeting test.','Practice','Cycle initialization'),
 q('Reverse start par current→10, prev=None. current.next=prev ke baad 10.next?', ['20','None','10','30'],'None','First forward arrow reverse hokar list ka old head new tail candidate banta hai.','Core','Reverse step'),
 q('Reverse mein nxt save kiye bina current.next=prev kar diya. Kya lose?', ['Previous part','Original successor/remainder','Head data','Node object current'],'Original successor/remainder','Current ka original next hi remaining unreversed chain tak ekmatra rasta tha.','Practice','Pointer-order trap')
].forEach((question,index)=>gate.questions.push({id:`m4-gate-patterns-${gate.questions.length+1}`,number:gate.questions.length+1,...question}))

export const module4Topics=[intro,comparison,types,sllSetup,sllInsertBeginning,sllInsertEnd,sllInsertMiddle,sllSearch,sllDeleteBeginning,sllDeleteEnd,sllDeleteMiddle,sllComplexity,csll,dll,cdll,coding,gate]
export const module4QuestionCount=module4Topics.reduce((sum,t)=>sum+t.questions.length,0)
