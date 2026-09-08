import"./style-DsDXPo8l.js";var e=(e,t,n,r,i=`Core`,a=`Concept`)=>({prompt:e,options:t,answer:n,explanation:r,difficulty:i,pattern:a}),t=(e,t,n,r,i)=>({id:e,number:t,label:n,questions:Array.from({length:Math.min(r,10)},(t,n)=>({id:`m4-${e}-${n+1}`,number:n+1,...i(n,1)}))}),n=t(`intro`,`4.1`,`Linked-list foundations`,50,(t,n)=>[e(`Linked list kis se banti hai?`,[`Contiguous slots only`,`Nodes connected by references`,`Hash buckets only`,`Matrix rows`],`Nodes connected by references`,`Har node data aur link/reference field rakhta hai.`,`Foundation`,`Definition`),e(`Singly linked list ke last node ka next?`,[`head`,`tail`,`None`,`itself always`],`None`,`Non-circular SLL end marker None hota hai.`,`Foundation`,`Termination`),e(`Head kya represent karta hai?`,[`Last data`,`First node reference`,`Length only`,`Every node`],`First node reference`,`Empty list mein head normally None.`,`Foundation`,`Head`),e(`Nodes contiguous memory mein hona required?`,[`Yes`,`No`,`Only circular`,`Only Python list`],`No`,`Links logical order preserve karte hain; physical locations scattered ho sakti hain.`,`Foundation`,`Memory model`),e(`Node typically SLL mein kya store karta hai?`,[`data only`,`data + next`,`prev only`,`index table`],`data + next`,`Next successor node ka reference hai.`,`Foundation`,`Node anatomy`),e(`Empty linked list ki standard condition?`,[`head==0 data`,`head is None`,`length negative`,`tail=head always`],`head is None`,`No first node exists.`,`Foundation`,`Empty state`),e(`Random index access L[i] linked list mein?`,[`O(1)`,`O(log n)`,`O(i), worst O(n)`,`O(n²)`],`O(i), worst O(n)`,`Head se i links follow karne padte hain.`,`Core`,`Sequential access`),e(`Per-node pointer overhead SLL mein?`,[`No overhead`,`One next reference besides data`,`n references per node`,`Only length`],`One next reference besides data`,`Flexibility ke badle metadata memory lagti hai.`,`Core`,`Space`),e(`Linked-list order ka source?`,[`Memory address order`,`next/prev links`,`Sorted data`,`Indices array`],`next/prev links`,`Physical adjacency irrelevant; references logical chain define karte hain.`,`Core`,`Logical order`),e(`n=${10*n} nodes traversal ka time?`,[`O(1)`,`O(log n)`,`O(n)`,`O(n²)`],`O(n)`,`Each node once visit.`,`Core`,`Traversal`)][t]),r=t(`compare`,`4.3`,`Linked lists vs arrays/lists`,50,(t,n)=>[e(`Frequent random index reads ke liye better typical structure?`,[`Linked list`,`Array/Python list`,`Both identical`,`Tree always`],`Array/Python list`,`Contiguous slot address gives O(1) indexing.`,`Foundation`,`Selection`),e(`Known node ke baad insertion linked list mein cost?`,[`O(1)`,`O(log n)`,`O(n)`,`O(n²)`],`O(1)`,`Few references change; search cost excluded because node already known.`,`Core`,`Known-pointer nuance`),e(`Position i par insert when only head given?`,[`Always O(1)`,`O(i), worst O(n)`,`O(log n)`,`Impossible`],`O(i), worst O(n)`,`Position/predecessor locate karna sequential.`,`Core`,`Search + update`),e(`Array middle insertion vs linked list known-position insertion?`,[`Both shift`,`Array shifts; linked rewires`,`Linked shifts data`,`Both O(1) always`],`Array shifts; linked rewires`,`But linked position discovery may dominate.`,`Core`,`Trade-off`),e(`Cache locality generally better kiski?`,[`Linked list`,`Contiguous array`,`Same guaranteed`,`Circular only`],`Contiguous array`,`Nearby elements nearby memory slots; linked nodes scattered ho sakte hain.`,`Core`,`Locality`),e(`Linked list ko dynamic kehne ka reason?`,[`No memory`,`Nodes individually add/remove`,`Sorted automatically`,`No pointers`],`Nodes individually add/remove`,`Capacity-resize block ki need nahi, though allocator costs remain.`,`Foundation`,`Dynamic size`),e(`Sorted linked list par binary search standard O(log n)?`,[`Yes`,`No, middle access linear`,`Only duplicates`,`Only even n`],`No, middle access linear`,`Halving comparisons enough nahi; midpoint reach cost include karo.`,`Core`,`Binary-search trap`),e(`Overall n-node SLL space?`,[`O(1)`,`O(log n)`,`O(n)`,`O(n²)`],`O(n)`,`Each node data + constant link metadata.`,`Core`,`Space`),e(`Deletion O(1) claim mein hidden prerequisite?`,[`List sorted`,`Node/predecessor access known`,`Data numeric`,`Length even`],`Node/predecessor access known`,`SLL mein target ka predecessor link update karna hota hai.`,`Core`,`Prerequisite`),e(`Best structure choice depends on?`,[`Only n`,`Access/update workload and memory`,`Variable names`,`IDE`],`Access/update workload and memory`,`Random access, locality, insertion positions and overhead weigh karo.`,`Foundation`,`Trade-off`)][t]),i=t(`types`,`4.4`,`Types of linked lists`,50,(t,n)=>[e(`Singly node links?`,[`next only`,`prev only`,`prev+next`,`head only`],`next only`,`Forward traversal.`,`Foundation`,`SLL`),e(`Circular singly last.next?`,[`None`,`head`,`tail`,`previous`],`head`,`Cycle closes to first node.`,`Foundation`,`CSLL`),e(`Doubly node fields?`,[`data,next`,`data,prev,next`,`data only`,`head,tail`],`data,prev,next`,`Backward and forward traversal.`,`Foundation`,`DLL`),e(`Non-circular DLL boundary invariant?`,[`head.prev=None and tail.next=None`,`head.next=head`,`tail.prev=None`,`No tail`],`head.prev=None and tail.next=None`,`Ends terminate in opposite directions.`,`Core`,`DLL invariant`),e(`Circular doubly invariants?`,[`tail.next=head and head.prev=tail`,`both None`,`head.next=None`,`tail=head always`],`tail.next=head and head.prev=tail`,`Both directions cycle close.`,`Core`,`CDLL invariant`),e(`Round-robin scheduling natural fit?`,[`SLL only`,`Circular linked list`,`Array required`,`BST`],`Circular linked list`,`Last participant ke baad first automatically.`,`Foundation`,`Use case`),e(`Backward traversal naturally supported?`,[`SLL`,`DLL/CDLL`,`CSLL only`,`None`],`DLL/CDLL`,`prev links required.`,`Foundation`,`Traversal direction`),e(`Most pointer/reference fields per node among types?`,[`SLL`,`CSLL`,`DLL/CDLL`,`All same`],`DLL/CDLL`,`prev and next two links.`,`Core`,`Space overhead`),e(`Circular traversal stop condition cannot be current is None kyun?`,[`None immediately`,`Valid cycle never reaches None`,`Python error`,`Data missing`],`Valid cycle never reaches None`,`Return-to-start or counted nodes stop condition use karo.`,`Core`,`Termination`),e(`One-node CDLL invariant?`,[`next/prev None`,`node.next=node.prev=node`,`head absent`,`tail None`],`node.next=node.prev=node`,`Single node both circular links itself.`,`Core`,`Singleton`)][t]),a=t(`sll-setup`,`4.5.1`,`SLL initial setup and traversal`,60,(t,n)=>[e(`Node constructor mein new node next initial value?`,[`head`,`None`,`data`,`tail`],`None`,`Unlinked node ka successor abhi absent.`,`Foundation`,`Initialization`),e(`SLL display loop update?`,[`current=head each time`,`current=current.next`,`head=head.next always`,`current.prev`],`current=current.next`,`Chain forward progress.`,`Foundation`,`Traversal`),e(`Traversal mein current update bhool gaye?`,[`Correct`,`Infinite loop`,`List reverse`,`Node delete`],`Infinite loop`,`Same node repeatedly process hoga.`,`Core`,`Loop progress`),e(`get_length without stored length cost?`,[`O(1)`,`O(log n)`,`O(n)`,`O(n²)`],`O(n)`,`All nodes count.`,`Core`,`Length`),e(`Stored length field ka len query?`,[`O(1)`,`O(n)`,`O(log n)`,`Unknown`],`O(1)`,`Mutation operations field consistently update karein.`,`Core`,`Metadata`),e(`Empty display access head.data blindly?`,[`Safe`,`AttributeError risk`,`Returns None`,`Creates node`],`AttributeError risk`,`head None case first handle.`,`Core`,`Empty edge`),e(`SLL traversal direction?`,[`Forward only`,`Backward only`,`Both without extra work`,`Random`],`Forward only`,`Only next reference.`,`Foundation`,`Direction`),e(`List ${n+2} nodes; current=head; current=current.next twice. Position?`,[`0`,`1`,`2`,`last always`],`2`,`Each next one position forward.`,`Foundation`,`Pointer trace`),e(`Head reassign karna list object ko?`,[`Destroy always`,`First-node reference change`,`Sort`,`Copy all nodes`],`First-node reference change`,`Remaining nodes links se reachable/unreachable decide hote hain.`,`Core`,`Reachability`),e(`Unreachable node Python mein eventually?`,[`Guaranteed immediate delete`,`Garbage collection/reference counting may reclaim`,`Becomes head`,`Self-links`],`Garbage collection/reference counting may reclaim`,`Conceptually references detach; manual free Python code mein nahi.`,`Core`,`Python memory`)][t]);t(`sll-insert`,`4.5B`,`SLL insertion`,60,(t,n)=>[e(`Insert beginning correct order?`,[`head=node then node.next=head`,`node.next=head then head=node`,`tail=None`,`search first always`],`node.next=head then head=node`,`Old head reference lose hone se pehle save in node.next.`,`Core`,`Pointer order`),e(`Empty SLL insert beginning after?`,[`head None`,`head new node`,`node.next=head cycle`,`Error`],`head new node`,`New node only element, next None.`,`Foundation`,`Empty case`),e(`Without tail pointer insert end?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(n)`,`Last node locate by traversal.`,`Core`,`Tail insertion`),e(`With maintained tail pointer insert end?`,[`O(1)`,`O(n)`,`O(log n)`,`Impossible`],`O(1)`,`tail.next=node; tail=node.`,`Core`,`Optimization`),e(`Insert between q and p correct links?`,[`q.next=p only`,`node.next=p; q.next=node`,`p.next=node only`,`head=None`],`node.next=p; q.next=node`,`New node successor p, predecessor q points new.`,`Core`,`Middle insertion`),e(`Valid insertion positions length n?`,[`0…n−1`,`0…n`,`1…n only`,`Any integer`],`0…n`,`Position n means append.`,`Core`,`Boundary`),e(`Insert after known node x in SLL?`,[`Need predecessor`,`node.next=x.next; x.next=node`,`Scan tail always`,`Change head only`],`node.next=x.next; x.next=node`,`Successor preserve before rewiring x.`,`Core`,`Known node`),e(`Pointer update wrong order x.next=node; node.next=x.next creates?`,[`Correct`,`node self-loop`,`Delete x`,`None`],`node self-loop`,`After first assignment x.next is node, so node.next becomes itself.`,`Practice`,`Update-order trap`),e(`Position-based middle insertion overall?`,[`O(1) always`,`O(n) search + O(1) rewiring`,`O(n²)`,`O(log n)`],`O(n) search + O(1) rewiring`,`Locate dominates.`,`Core`,`Decomposition`),e(`Insert beginning length metadata?`,[`Decrease`,`Increase once`,`Unchanged`,`Set zero`],`Increase once`,`Wrapper calls mein double increment avoid.`,`Core`,`Invariant`)][t]),t(`sll-ops`,`4.5C`,`SLL search, deletion and complexity`,60,(t,n)=>[e(`Absent key search worst time?`,[`O(1)`,`O(log n)`,`O(n)`,`O(n²)`],`O(n)`,`End/None reach after all nodes.`,`Core`,`Search`),e(`Delete beginning non-empty?`,[`head=head.next`,`tail=head`,`head=None always`,`Scan all`],`head=head.next`,`One reference update; O(1).`,`Foundation`,`Head deletion`),e(`Delete end SLL without tail/predecessor?`,[`O(1)`,`O(n)`,`O(log n)`,`Impossible`],`O(n)`,`Penultimate node locate. Tail pointer alone also predecessor nahi deta.`,`Core`,`End deletion`),e(`Single-node delete end final state?`,[`head same`,`head=None (and tail=None if stored)`,`cycle`,`two nodes`],`head=None (and tail=None if stored)`,`Empty invariant restore.`,`Core`,`Singleton`),e(`Delete target node p in SLL when predecessor q known?`,[`q.next=p.next`,`p.next=q`,`head=p`,`q=None`],`q.next=p.next`,`Bypass p; optional p.next=None detach.`,`Core`,`Bypass`),e(`Delete by position valid indices length n?`,[`0…n`,`0…n−1`,`1…n`,`Any`],`0…n−1`,`Position n no existing node.`,`Core`,`Boundary`),e(`Search sorted SLL generic worst?`,[`O(log n)`,`O(n)`,`O(1)`,`O(n²)`],`O(n)`,`Sequential access; can early stop but worst linear.`,`Core`,`Sorted search`),e(`Traversal auxiliary space iterative?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`One current reference; nodes input storage.`,`Core`,`Space`),e(`Recursive traversal stack space?`,[`O(1)`,`O(n)`,`O(log n)`,`O(2ⁿ)`],`O(n)`,`One active call per node.`,`Core`,`Recursion space`),e(`Delete only given pointer p in SLL possible general last node?`,[`Always O(1)`,`Not general for last; predecessor needed`,`Always O(n²)`,`Only sorted`],`Not general for last; predecessor needed`,`Copy-next trick only non-tail and changes node identity semantics.`,`Practice`,`Deletion limitation`)][t]);var o=t(`sll-insert-beginning`,`4.5.2`,`SLL insertion at beginning`,50,(t,n)=>[e(`Beginning insertion ka correct order?`,[`head=node; node.next=head`,`node.next=head; head=node`,`head.next=node`,`tail=node only`],`node.next=head; head=node`,`Old head ko node.next mein preserve karke head shift hota hai.`,`Core`,`Pointer order`),e(`Empty SLL mein beginning insertion ke baad?`,[`head None`,`head new node, node.next None`,`self-loop`,`error`],`head new node, node.next None`,`Old head None tha, so new node only node banta hai.`,`Foundation`,`Empty case`),e(`Wrong order head=node; node.next=head ka result?`,[`Correct list`,`Node self-loop`,`Old head tail`,`Sorted list`],`Node self-loop`,`Head first new node hua; node.next same node ko point karega.`,`Core`,`Self-loop trap`),e(`Beginning insertion time complexity?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`Fixed reference updates; traversal nahi.`,`Foundation`,`Complexity`),e(`Old list reachable rakhne wali first assignment?`,[`head=None`,`node.next=head`,`head.next=node`,`node.data=head`],`node.next=head`,`New node old first node tak path preserve karta hai.`,`Core`,`Reachability`),e(`List A→B mein X beginning par final chain?`,[`A→X→B`,`X→A→B`,`X→X`,`B→A→X`],`X→A→B`,`X new head, X.next old A.`,`Foundation`,`Trace`),e(`Head insertion ke baad kya point karta hai?`,[`Old first`,`New first node`,`Tail`,`Length`],`New first node`,`Head always logical first-node reference.`,`Foundation`,`Head invariant`),e(`Tail maintain ho aur empty list mein first insert?`,[`Only head set`,`Head and tail both new node`,`Tail None forever`,`Tail old head`],`Head and tail both new node`,`Singleton mein head is tail.`,`Core`,`Tail boundary`),e(`Length metadata successful insert par?`,[`Decrease`,`Increase exactly once`,`Unchanged`,`Set zero`],`Increase exactly once`,`One new node list ka part bana.`,`Core`,`Metadata`),e(`Five beginning insertions ki total cost?`,[`O(1)`,`O(5), generally O(k)`,`O(n²)`,`O(log n)`],`O(5), generally O(k)`,`Each operation O(1); k operations O(k).`,`Practice`,`Repeated operations`)][t]),s=t(`sll-insert-end`,`4.5.3`,`SLL insertion at end`,50,(t,n)=>[e(`Only head stored ho toh end insertion worst time?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(n)`,`Last node locate karne ke liye traversal.`,`Core`,`Locate tail`),e(`while current.next ke baad current kahan?`,[`None`,`Last node`,`Head always`,`Second-last`],`Last node`,`Condition false when current.next None.`,`Core`,`Loop postcondition`),e(`Empty list append mein?`,[`Traverse None`,`head=new node and return`,`self-loop`,`invalid`],`head=new node and return`,`New node first/last both hai.`,`Foundation`,`Empty case`),e(`Last node milne ke baad update?`,[`head=node`,`current.next=new_node`,`new_node.next=head`,`current=None`],`current.next=new_node`,`Old tail new node ko successor banata hai.`,`Foundation`,`Rewire`),e(`while current loop ke baad current?`,[`Tail`,`None`,`Head`,`New node`],`None`,`Isliye current.next update nahi kar sakte.`,`Core`,`Loop condition trap`),e(`Maintained tail ke saath append?`,[`tail.next=node; tail=node`,`head=node only`,`node.next=tail`,`tail=None`],`tail.next=node; tail=node`,`Old tail connects new; tail shifts.`,`Core`,`Tail optimization`),e(`Maintained tail append complexity?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`Direct last-node reference.`,`Foundation`,`Complexity`),e(`Singleton A mein X append final?`,[`X→A`,`A→X→None`,`A self-loop`,`Head None`],`A→X→None`,`A old tail, A.next X.`,`Foundation`,`Trace`),e(`Tail pointer alone delete-end O(1)?`,[`Yes always`,`No, predecessor unavailable`,`Only sorted`,`Only empty`],`No, predecessor unavailable`,`SLL backward link absent.`,`Core`,`Nuance`),e(`n nodes, only head append visits?`,[`0`,`1`,`Θ(n)`,`Θ(log n)`],`Θ(n)`,`Tail tak sequential walk.`,`Practice`,`Cost trace`)][t]),c=t(`sll-insert-middle`,`4.5.4`,`SLL insertion in middle`,50,(t,n)=>[e(`Length n ke valid insertion positions?`,[`0…n−1`,`0…n`,`1…n`,`Any`],`0…n`,`Position n append hai.`,`Core`,`Bounds`),e(`Middle insertion mein q aur p?`,[`q target`,`q predecessor, p old node at pos`,`Both None`,`Both tail`],`q predecessor, p old node at pos`,`New node q aur p ke beech.`,`Core`,`Two references`),e(`q aur p known ho toh links?`,[`q.next=node; node.next=p`,`node.next=q; p.next=node`,`q.next=p only`,`head=node`],`q.next=node; node.next=p`,`Chain q→new→p.`,`Core`,`Rewire`),e(`Position 0 route?`,[`End`,`Beginning insertion`,`Search`,`Delete`],`Beginning insertion`,`Head boundary.`,`Foundation`,`Boundary`),e(`Position n route?`,[`Beginning`,`End insertion`,`Invalid`,`Search`],`End insertion`,`Insert after tail.`,`Foundation`,`Boundary`),e(`Position n+1?`,[`Append`,`Invalid`,`Beginning`,`Self-loop`],`Invalid`,`Maximum n.`,`Foundation`,`Validation`),e(`Predecessor already known rewire cost?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`Fixed references.`,`Core`,`Known node`),e(`Only position given overall cost?`,[`O(1)`,`O(n) locate + O(1) rewire`,`O(log n)`,`Impossible`],`O(n) locate + O(1) rewire`,`Locate dominates.`,`Core`,`Decomposition`),e(`Old successor p preserve kyun?`,[`Sorting`,`Remaining suffix reachable rahe`,`Length zero`,`Tail delete`],`Remaining suffix reachable rahe`,`Overwrite ke baad bhi chain available.`,`Core`,`Reachability`),e(`Insertion aur deletion bounds same?`,[`Yes`,`No: insert allows n, delete only n−1`,`Only DLL`,`Only circular`],`No: insert allows n, delete only n−1`,`Position n means append but no node to delete.`,`Practice`,`Bounds`)][t]),l=t(`sll-search`,`4.5.5`,`SLL searching`,50,(t,n)=>[e(`SLL search kahan se start?`,[`Tail`,`Head`,`Middle`,`Random`],`Head`,`Only forward links.`,`Foundation`,`Start`),e(`Key equal milte hi?`,[`Continue mandatory`,`Return first match`,`Delete`,`Reverse`],`Return first match`,`Implementation first occurrence reports.`,`Foundation`,`Match`),e(`Absent key worst-case?`,[`O(1)`,`O(log n)`,`O(n)`,`O(n²)`],`O(n)`,`All nodes visit.`,`Core`,`Worst case`),e(`Key head par best-case?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`First comparison.`,`Core`,`Best case`),e(`Search loop progress?`,[`current=head`,`current=current.next`,`head=current.next`,`current.prev`],`current=current.next`,`Agle node par move.`,`Foundation`,`Progress`),e(`Empty search first?`,[`head.data`,`Empty guard`,`Tail traverse`,`Create key`],`Empty guard`,`None dereference avoid.`,`Core`,`Empty edge`),e(`Duplicate key, immediate return?`,[`Last`,`First occurrence`,`All`,`Error`],`First occurrence`,`First equality par exit.`,`Core`,`Duplicates`),e(`Sorted SLL standard search worst?`,[`O(log n)`,`O(n)`,`O(1)`,`O(n²)`],`O(n)`,`Direct midpoint access nahi.`,`Core`,`Sorted nuance`),e(`Iterative search auxiliary space?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`Few variables.`,`Core`,`Space`),e(`Position i par key ke comparisons?`,[`i`,`i+1`,`n²`,`0`],`i+1`,`Index 0 through i compare.`,`Practice`,`Trace`)][t]),u=t(`sll-delete-beginning`,`4.5.6`,`SLL deletion at beginning`,50,(t,n)=>[e(`Delete beginning core update?`,[`head=head.next`,`tail=head`,`head=None always`,`scan tail`],`head=head.next`,`Second node new head.`,`Foundation`,`Head shift`),e(`Empty list deletion?`,[`head.data`,`Reject safely`,`Create node`,`Traverse`],`Reject safely`,`Target absent.`,`Foundation`,`Empty case`),e(`Old head current mein save kyun?`,[`Sort`,`Detach old node`,`Find tail`,`Count`],`Detach old node`,`Head shift ke baad reference available.`,`Core`,`Temporary ref`),e(`current.next=None purpose?`,[`Reconnect`,`Explicit detach`,`New head None`,`Cycle`],`Explicit detach`,`Removed node link clear.`,`Core`,`Detach`),e(`Singleton delete beginning final head?`,[`Same`,`None`,`Self-loop`,`Tail only`],`None`,`Only node removed.`,`Core`,`Singleton`),e(`Tail maintained singleton deletion?`,[`Old tail`,`Tail also None`,`No change`,`Tail=head.next`],`Tail also None`,`Empty invariant.`,`Core`,`Tail invariant`),e(`Delete beginning time?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`Fixed updates.`,`Foundation`,`Complexity`),e(`Length metadata successful delete?`,[`Increase`,`Decrease once`,`Unchanged`,`Set -1`],`Decrease once`,`One node removed.`,`Core`,`Metadata`),e(`A→B→C delete beginning?`,[`A→C`,`B→C`,`C only`,`Empty`],`B→C`,`Head moves to B.`,`Foundation`,`Trace`),e(`k beginning deletions total?`,[`O(1)`,`O(k)`,`O(k²)`,`O(log k)`],`O(k)`,`Each O(1).`,`Practice`,`Repeated ops`)][t]),ee=t(`sll-delete-end`,`4.5.7`,`SLL deletion at end`,50,(t,n)=>[e(`Delete end mein p final?`,[`Head`,`Last node`,`None`,`Second-last`],`Last node`,`p target.`,`Core`,`Target`),e(`Delete end mein q final?`,[`After p`,`Predecessor of p`,`Always None`,`Head only`],`Predecessor of p`,`q new tail.`,`Core`,`Predecessor`),e(`Multi-node update?`,[`q.next=None`,`p.next=q`,`head=p`,`tail.next=head`],`q.next=None`,`Penultimate becomes tail.`,`Foundation`,`Detach`),e(`Singleton mein q?`,[`Head`,`None`,`Tail.next`,`New`],`None`,`Loop zero times.`,`Core`,`Singleton`),e(`Singleton delete-end update?`,[`q.next=None`,`head=None`,`p.next=p`,`No-op`],`head=None`,`Avoid q None dereference.`,`Core`,`Boundary`),e(`Only head delete-end time?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(n)`,`Penultimate locate.`,`Core`,`Complexity`),e(`Tail alone sufficient O(1)?`,[`Yes`,`No`,`Only even n`,`Only sorted`],`No`,`Need predecessor.`,`Core`,`Tail nuance`),e(`DLL tail.prev delete-end?`,[`O(1)`,`O(n)`,`O(log n)`,`Impossible`],`O(1)`,`Backward ref direct.`,`Core`,`Comparison`),e(`A→B→C delete end?`,[`A→C`,`A→B→None`,`B→C`,`Empty`],`A→B→None`,`B becomes tail.`,`Foundation`,`Trace`),e(`n-node delete-end traversal?`,[`Θ(1)`,`Θ(n)`,`Θ(log n)`,`Θ(n²)`],`Θ(n)`,`Penultimate tak walk.`,`Practice`,`Cost`)][t]),te=t(`sll-delete-middle`,`4.5.8`,`SLL deletion in middle`,50,(t,n)=>[e(`Length n valid deletion indices?`,[`0…n`,`0…n−1`,`1…n`,`Any`],`0…n−1`,`Position n absent.`,`Core`,`Bounds`),e(`Middle delete mein p?`,[`Predecessor`,`Target node`,`Tail always`,`Head always`],`Target node`,`p position pos.`,`Core`,`Target`),e(`Middle delete mein q?`,[`Successor`,`Target predecessor`,`None always`,`Length`],`Target predecessor`,`q bypass link updates.`,`Core`,`Predecessor`),e(`Core bypass?`,[`q.next=p.next`,`p.next=q`,`head=p`,`q=None`],`q.next=p.next`,`Predecessor to successor.`,`Core`,`Bypass`),e(`p.next=None purpose?`,[`Delete suffix`,`Detach removed node`,`Cycle`,`Count`],`Detach removed node`,`Link clear.`,`Core`,`Detach`),e(`Delete position 0 ko kis operation par route karna chahiye?`,[`Delete beginning`,`Delete end`,`Invalid`,`Search`],`Delete beginning`,`Head boundary.`,`Foundation`,`Boundary`),e(`Position n−1 route?`,[`Beginning`,`Delete end`,`Invalid`,`Middle only`],`Delete end`,`Tail boundary.`,`Foundation`,`Boundary`),e(`q and p already known rewire?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`Fixed bypass.`,`Core`,`Known refs`),e(`Only position overall?`,[`O(1)`,`O(n) locate + O(1) bypass`,`O(log n)`,`Impossible`],`O(n) locate + O(1) bypass`,`Traversal dominates.`,`Core`,`Decomposition`),e(`Delete position n valid?`,[`Yes`,`No`,`Only circular`,`Only DLL`],`No`,`Largest n−1.`,`Practice`,`Bounds`)][t]),d=t(`sll-complexity`,`4.5.9`,`SLL complexity analysis`,50,(t,n)=>[e(`n-node SLL traversal time?`,[`O(1)`,`O(log n)`,`O(n)`,`O(n²)`],`O(n)`,`Har node exactly once visit hota hai.`,`Foundation`,`Traversal`),e(`Search key head par milne ka best case?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`First comparison ke baad return.`,`Foundation`,`Best case`),e(`Absent key search worst case?`,[`O(1)`,`O(log n)`,`O(n)`,`O(n²)`],`O(n)`,`None tak saare nodes scan.`,`Core`,`Worst case`),e(`Insert beginning complexity?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`Fixed new.next and head updates.`,`Foundation`,`Insertion`),e(`Only-head implementation mein insert end?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(n)`,`Last node locate karna padta hai.`,`Core`,`Insertion`),e(`Position-based middle insertion total?`,[`O(1) always`,`O(n) worst`,`O(log n)`,`O(n²)`],`O(n) worst`,`Locate O(n), link updates O(1).`,`Core`,`Locate plus rewire`),e(`Delete beginning complexity?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`Head=head.next fixed update.`,`Foundation`,`Deletion`),e(`Delete end SLL worst case?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(n)`,`Second-last node locate.`,`Core`,`Deletion`),e(`Space per SLL node?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`Fixed data plus one next reference.`,`Core`,`Space`),e(`Overall n-node SLL storage?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(n)`,`n constant-size nodes.`,`Core`,`Overall space`)][t]),f=t(`csll`,`4.6`,`Circular singly linked list`,60,(t,n)=>[e(`CSLL last.next?`,[`None`,`head`,`tail`,`last`],`head`,`Circular invariant.`,`Foundation`,`Invariant`),e(`Empty CSLL display?`,[`do-while from None`,`Handle before dereference`,`Infinite required`,`Create node`],`Handle before dereference`,`head None cannot access data/next.`,`Core`,`Empty edge`),e(`Traversal stop condition?`,[`current is None`,`current returns to head`,`data zero`,`tail None`],`current returns to head`,`Cycle has no None end.`,`Core`,`Termination`),e(`while current without circular stop?`,[`Works once`,`Infinite loop for valid cycle`,`O(1)`,`Deletes nodes`],`Infinite loop for valid cycle`,`All node references truthy repeatedly.`,`Core`,`Infinite-loop trap`),e(`One-node CSLL after insertion?`,[`node.next=None`,`node.next=node`,`head=None`,`two nodes`],`node.next=node`,`Cycle closes to itself.`,`Core`,`Singleton`),e(`Notebook CSLL insert beginning without tail cost?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(n)`,`Last node locate to update last.next.`,`Core`,`Implementation cost`),e(`With tail pointer CSLL insert beginning?`,[`O(1)`,`O(n)`,`Impossible`,`O(log n)`],`O(1)`,`node.next=head; tail.next=node; head=node.`,`Core`,`Optimization`),e(`Count nodes algorithm initialization non-empty?`,[`count=0,current=head.next only`,`count=1,current=head.next`,`count=n known only`,`Infinite`],`count=1,current=head.next`,`Head already counted, then until return.`,`Core`,`Counting`),e(`Delete sole node?`,[`head=head.next forever`,`head=None; tail=None if stored`,`keep self-loop`,`invalid`],`head=None; tail=None if stored`,`List becomes empty.`,`Core`,`Singleton deletion`),e(`CSLL common application?`,[`Binary search`,`Round robin`,`Matrix multiplication`,`Heap sort`],`Round robin`,`Cyclic successor natural.`,`Foundation`,`Use case`)][t]),p=t(`dll`,`4.7`,`Doubly linked list`,60,(t,n)=>[e(`DLL node extra field vs SLL?`,[`length`,`prev`,`head`,`index`],`prev`,`Previous node reference backward traversal allows.`,`Foundation`,`Node anatomy`),e(`Insert between q and p key invariants?`,[`q.next=node,node.prev=q,node.next=p,p.prev=node`,`Only q.next`,`Only p.prev`,`head=None`],`q.next=node,node.prev=q,node.next=p,p.prev=node`,`Four directional relationships restore.`,`Core`,`Insertion`),e(`Delete middle p when neighbors exist?`,[`p.prev.next=p.next and p.next.prev=p.prev`,`Only p=None`,`head=tail`,`Swap data`],`p.prev.next=p.next and p.next.prev=p.prev`,`Both directions bypass p.`,`Core`,`Deletion`),e(`DLL delete end with tail pointer?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`tail=tail.prev then tail.next=None.`,`Core`,`Tail deletion`),e(`DLL insert end with tail?`,[`O(1)`,`O(n)`,`O(log n)`,`Impossible`],`O(1)`,`No traversal.`,`Core`,`Tail insertion`),e(`Position-based middle op only head/tail known?`,[`O(1) always`,`O(n) locate, O(1) rewire`,`O(n²)`,`O(log n)`],`O(n) locate, O(1) rewire`,`Node search dominates.`,`Core`,`Known-node nuance`),e(`Backward display starts?`,[`head`,`tail`,`None`,`middle`],`tail`,`Follow prev until None.`,`Foundation`,`Backward traversal`),e(`One-node DLL invariants?`,[`head=tail=node; prev=next=None`,`head None`,`self-cycle required`,`tail.next=head`],`head=tail=node; prev=next=None`,`Non-circular singleton.`,`Core`,`Singleton`),e(`Delete beginning multi-node must set?`,[`new head.prev=None`,`tail.next=head`,`old head.prev=head`,`length zero`],`new head.prev=None`,`Backward dangling link remove.`,`Core`,`Boundary update`),e(`DLL memory per node vs SLL?`,[`Less`,`More by one reference`,`Same guaranteed`,`Zero`],`More by one reference`,`prev field extra overhead.`,`Foundation`,`Space trade-off`)][t]),m=t(`cdll`,`4.8`,`Circular doubly linked list`,60,(t,n)=>[e(`CDLL boundary links?`,[`head.prev=tail and tail.next=head`,`both None`,`head.next=None`,`tail.prev=None`],`head.prev=tail and tail.next=head`,`Doubly circular invariant.`,`Foundation`,`Invariant`),e(`One-node CDLL?`,[`next/prev None`,`next=prev=self`,`head None`,`two nodes`],`next=prev=self`,`Both directions return same node.`,`Core`,`Singleton`),e(`Insert beginning with head/tail pointers cost?`,[`O(1)`,`O(n)`,`O(log n)`,`O(n²)`],`O(1)`,`Four boundary links plus head update.`,`Core`,`Insertion`),e(`Insert end with head/tail cost?`,[`O(1)`,`O(n)`,`Impossible`,`O(log n)`],`O(1)`,`New node between old tail and head.`,`Core`,`Insertion`),e(`Forward traversal stop?`,[`None`,`back to head`,`back to tail before print always`,`data repeat`],`back to head`,`Circular next chain.`,`Core`,`Termination`),e(`Backward traversal stop?`,[`None`,`back to tail`,`head.next`,`length zero`],`back to tail`,`Start tail and follow prev cycle.`,`Core`,`Termination`),e(`Delete beginning length>1 updates?`,[`head=head.next; head.prev=tail; tail.next=head`,`head=None only`,`tail=tail.prev only`,`sort`],`head=head.next; head.prev=tail; tail.next=head`,`Both circular boundary links restore.`,`Core`,`Deletion`),e(`Delete end length>1 updates?`,[`tail=tail.prev; tail.next=head; head.prev=tail`,`head=head.next only`,`tail=None`,`reverse`],`tail=tail.prev; tail.next=head; head.prev=tail`,`Both directions close cycle.`,`Core`,`Deletion`),e(`Middle deletion given node p?`,[`O(1) rewiring`,`O(n) rewiring`,`Impossible`,`O(log n)`],`O(1) rewiring`,`p.prev.next and p.next.prev; finding p separate.`,`Core`,`Known-node nuance`),e(`CDLL biggest cost trade-off?`,[`No traversal`,`Extra pointer + complex invariants`,`Fixed size`,`No deletion`],`Extra pointer + complex invariants`,`Powerful bidirectional cycle but more update cases.`,`Foundation`,`Trade-off`)][t]),h=t(`coding`,`4.9`,`Lecture coding problems`,60,(t,n)=>[e(`Length n odd list middle index with zero-based n//2?`,[`First`,`Floor middle`,`Last`,`Out of range`],`Floor middle`,`For odd n unique center.`,`Foundation`,`Middle`),e(`Even n list n//2 selects?`,[`First of two middles`,`Second of two middles`,`No middle`,`Last`],`Second of two middles`,`Example n=4 → index2; policy must be stated.`,`Core`,`Middle convention`),e(`Fast/slow middle algorithm?`,[`slow 2, fast1`,`slow1, fast2`,`both0`,`reverse`],`slow1, fast2`,`Fast end par, slow middle.`,`Core`,`Fast-slow`),e(`Fast/slow middle time/space?`,[`O(n)/O(1)`,`O(n)/O(n)`,`O(log n)/O(1)`,`O(n²)/O(1)`],`O(n)/O(1)`,`Single traversal with two references.`,`Core`,`Complexity`),e(`Circular node count empty?`,[`1`,`0`,`Infinite`,`None`],`0`,`Empty separately return 0.`,`Foundation`,`Counting`),e(`Sum all nodes empty result natural identity?`,[`0`,`None always`,`1`,`Error mandatory`],`0`,`Additive identity; contract can specify otherwise.`,`Foundation`,`Aggregation`),e(`Max/min initialization non-empty linked list?`,[`0 always`,`head.data`,`∞ only`,`tail.next`],`head.data`,`All-negative/all-positive safe.`,`Core`,`Initialization`),e(`Max/min in one traversal time?`,[`O(1)`,`O(n)`,`O(n²)`,`O(log n)`],`O(n)`,`Each node once, constant comparisons.`,`Core`,`Aggregation`),e(`Notebook middle using stored length performs?`,[`One pass total including known length`,`length metadata + n/2 walk`,`Random access`,`Binary search`],`length metadata + n/2 walk`,`If length maintained, one half traversal. Without it, count+walk two passes still O(n).`,`Core`,`Implementation`),e(`Circular aggregation termination?`,[`while curr`,`until curr returns head`,`until None`,`fixed 1 only`],`until curr returns head`,`Valid cycle has no None.`,`Core`,`Circular loop`)][t]),g=t(`gate-patterns`,`4.G`,`GATE pointer patterns`,60,(t,n)=>[e(`Floyd cycle detection pointer speeds?`,[`1 and 2`,`1 and 3 only`,`both1`,`0 and1`],`1 and 2`,`If cycle, fast eventually meets slow.`,`Core`,`Cycle detection`),e(`Floyd algorithm auxiliary space?`,[`O(n)`,`O(1)`,`O(log n)`,`O(n²)`],`O(1)`,`Two pointers only.`,`Core`,`Space`),e(`Reverse SLL iterative core update order?`,[`curr.next=prev then advance using saved next`,`curr=curr.next then overwrite`,`head=None first`,`sort data`],`curr.next=prev then advance using saved next`,`Original successor save before reversing link.`,`Core`,`Reversal`),e(`Iterative SLL reverse time/aux?`,[`O(n)/O(1)`,`O(n)/O(n)`,`O(1)/O(n)`,`O(n²)/O(1)`],`O(n)/O(1)`,`Each node link once reversed; three references.`,`Core`,`Complexity`),e(`Recursive reverse stack space?`,[`O(1)`,`O(n)`,`O(log n)`,`O(2ⁿ)`],`O(n)`,`One call per node.`,`Core`,`Recursion`),e(`Merge two sorted linked lists optimal time?`,[`O(1)`,`O(n+m)`,`O(nm)`,`O(log n)`],`O(n+m)`,`Each node considered once; links can reuse nodes.`,`Core`,`Merge`),e(`Cycle length find after slow/fast meet?`,[`Walk one pointer until returns, count`,`Use array index only`,`Always n`,`Impossible`],`Walk one pointer until returns, count`,`One full cycle traversal.`,`Core`,`Cycle length`),e(`Kth node from end one-pass pattern?`,[`Two pointers gap k`,`Binary search`,`Sort`,`Recursion tree`],`Two pointers gap k`,`Advance fast k, then both until fast end.`,`Core`,`Gap pointers`),e(`Intersection of two SLL by identity vs data?`,[`Compare data only`,`Node object identity`,`Sort values`,`Count duplicates`],`Node object identity`,`Equal values do not mean shared physical suffix.`,`Practice`,`Intersection`),e(`Dummy/sentinel node benefit?`,[`Makes list circular always`,`Unifies head insertion/deletion cases`,`Removes all memory`,`Gives O(1) search`],`Unifies head insertion/deletion cases`,`Predecessor always available near logical head, fewer branches.`,`Core`,`Sentinel`)][t]);[e(`10→20→30→40→50→None mein standard 1-based k=2 from end?`,[`30`,`40`,`50`,`20`],`40`,`End se counting: 50 first, 40 second. Fast ko exactly 2 nodes ahead karke verify hota hai.`,`Core`,`Gap trace`),e(`Gap method mein k=length ho toh slow final kahan?`,[`Head`,`Tail`,`None`,`Middle`],`Head`,`Fast k steps ke baad None; slow move nahi karta, so head length-th from end hai.`,`Core`,`Gap boundary`),e(`Gap method mein k>length aur validation absent ho toh?`,[`Correct head`,`Dereference error`,`Always tail`,`Cycle`],`Dereference error`,`Fast ko k steps move karte waqt None.next access ho sakta hai; k range validate karo.`,`Practice`,`Gap invalid k`),e(`Even list 10→20→30→40 par slow/fast both head, condition fast and fast.next: returned middle?`,[`20`,`30`,`40`,`None`],`30`,`Standard update slow=slow.next, fast=fast.next.next second middle return karta hai.`,`Core`,`Even middle`),e(`First middle 20 chahiye for 4-node list: useful loop guard?`,[`fast and fast.next`,`fast.next and fast.next.next`,`while slow`,`while head`],`fast.next and fast.next.next`,`Fast ko two-step move tabhi do jab uske baad bhi pair available ho; slow first middle par rukta hai.`,`Practice`,`First middle`),e(`Cycle detection mein slow=fast=head ke turant baad equality check karna?`,[`Correct cycle proof`,`False positive`,`Required`,`Tail detect`],`False positive`,`Initialization par equality natural hai; pehle pointers move hone chahiye, phir meeting test.`,`Practice`,`Cycle initialization`),e(`Reverse start par current→10, prev=None. current.next=prev ke baad 10.next?`,[`20`,`None`,`10`,`30`],`None`,`First forward arrow reverse hokar list ka old head new tail candidate banta hai.`,`Core`,`Reverse step`),e(`Reverse mein nxt save kiye bina current.next=prev kar diya. Kya lose?`,[`Previous part`,`Original successor/remainder`,`Head data`,`Node object current`],`Original successor/remainder`,`Current ka original next hi remaining unreversed chain tak ekmatra rasta tha.`,`Practice`,`Pointer-order trap`)].forEach((e,t)=>g.questions.push({id:`m4-gate-patterns-${g.questions.length+1}`,number:g.questions.length+1,...e}));var _=[n,r,i,a,o,s,c,l,u,ee,te,d,f,p,m,h,g],v=_.reduce((e,t)=>e+t.questions.length,0),ne=[{year:`2025`,q:`Q27`,kind:`DIRECT LINKED-LIST PYQ`,title:`Binary search prerequisite`,answer:`Option C`,question:`For which input does binary search take O(log n) time in the worst case?`,options:[`A. Array of n integers in any order`,`B. Linked list of n integers in any order`,`C. Array of n integers in increasing order`,`D. Linked list of n integers in increasing order`],steps:`Binary search needs ordering plus O(1) middle access. Sorted array has both. Sorted linked list can compare ordered values, but reaching a chosen midpoint from head is not O(1), so standard worst-case is not O(log n).`,trap:`“Sorted” alone sufficient nahi. Underlying structure ke access operation ka cost include karo.`,pattern:`Algorithm complexity = number of logical steps × supporting data-structure operation cost.`},{year:`2024`,q:`Q41`,kind:`TRANSFER PYQ`,title:`Recursive reversal`,answer:`Option C`,question:`fun(D,s1,s2) endpoint values swap karke boundaries inward recursively move karta hai. Function kya karti hai?`,options:[`A. Minimum find`,`B. Merge sort`,`C. Inclusive segment reverse`,`D. Only endpoints swap`],steps:`Each recursive level one symmetric pair swap karta hai until boundaries meet/cross.`,trap:`Question Python array/list par hai, linked list par nahi. Linked list reversal values swap karne ke bajay next links reverse karke O(n) time, O(1) iterative auxiliary space mein hota hai.`,pattern:`Reversal invariant transfer; implementation representation-dependent.`}].map(e=>`<details class="pyq-card searchable" data-year="${e.year}"><summary><span class="year">${e.year}</span><span><b>${e.q} · ${e.title}</b><small>${e.kind}</small></span><i>＋</i></summary><div class="pyq-body"><div class="answer"><span>Correct answer</span><strong>${e.answer}</strong></div><div class="pyq-question"><h4>Original question · clean transcript</h4><p>${e.question}</p><ul>${e.options.map(e=>`<li>${e}</li>`).join(``)}</ul></div><div><h4>Step-by-step reasoning</h4><p>${e.steps}</p></div><aside><strong>GATE trap</strong><p>${e.trap}</p></aside><aside class="transfer"><strong>Reusable pattern</strong><p>${e.pattern}</p></aside></div></details>`).join(``),y=_.map(e=>`<option value="${e.id}">${e.number} · ${e.label} (${e.questions.length})</option>`).join(``),b=(e,t,n,r)=>`<div class="chapter-head"><div class="chapter-no"><span>${e}</span><small>${t}</small></div><div><h2>${n}</h2><p>${r}</p></div></div>`;document.querySelector(`#app`).innerHTML=`
<div class="read-progress"><span></span></div><header class="topbar"><a class="brand" href="#top"><b>DA</b><span><strong>Python + DSA</strong><small>GATE 2027 Notebook</small></span></a><nav><button class="tab active" data-view="notes">Detailed Notes</button><button class="tab" data-view="pyq">PYQ Evidence <i>1+1</i></button><button class="tab" data-view="practice">Practice <i>${v}</i></button><button class="tab" data-view="revision">Revision</button></nav><div class="actions"><button id="searchButton" aria-label="Search">⌕</button><button id="themeButton" aria-label="Theme">◐</button></div></header>
<div class="searchbox"><input id="search" type="search" placeholder="Search: head, tail, cycle, reverse, O(1)…"><span id="searchResult">Search current view</span></div>
<div class="layout" id="top"><aside class="sidebar"><p class="overline">Module 04</p><h2>Linked Lists</h2><div class="module-switch"><a href="./index.html">M01</a><a href="./module2.html">M02</a><a href="./module3.html">M03</a><a class="active" href="./module4.html">M04</a></div><div class="completion"><span><b>Lecture progress</b><i id="count">0/11</i></span><div><i id="bar"></i></div></div><nav id="toc"></nav><p class="source"><b>Sources</b>CampusX PDF + five linked-list notebooks + GATE DA 2024–2026 papers</p></aside><main>
<div class="view active" data-panel="notes">
 <section class="hero module4-hero searchable" data-title="Overview"><p class="eyebrow"><i></i> Module 04 · references build order</p><h1>Boxes nahi—<em>links ka invariant</em> trace karo.</h1><p>Linked-list question mein data secondary hai. Head, tail, next, prev aur reachability ka before/after diagram answer deta hai.</p><div class="metrics"><span><b>1</b>direct DA PYQ</span><span><b>1</b>transfer PYQ</span><span><b>${v}</b>practice drills</span></div><div class="syllabus"><b>2027 syllabus map</b>Basic data structures · linked lists · foundation for stacks, queues and graph adjacency lists</div></section>

 <section class="lecture-track searchable" id="lecture-track" data-title="Module 4 lecture tracker"><div class="track-head"><div><p class="eyebrow"><i></i> CampusX + GATE bridges</p><h2>Module 4 · Lecture Tracker</h2><p>Pointer code ko lecture order mein master karo; complexity mein “node known?” explicitly check karo.</p></div><strong id="lecturePercent">0%</strong></div><div class="lecture-list"><label><input type="checkbox" data-lecture="4.1"><span><b>4.1</b><i>Introduction</i><small>Node, head, links</small></span></label><label><input type="checkbox" data-lecture="4.2"><span><b>4.2</b><i>Memory model</i><small>Non-contiguous reachability</small></span></label><label><input type="checkbox" data-lecture="4.3"><span><b>4.3</b><i>Lists vs arrays</i><small>Trade-offs</small></span></label><label><input type="checkbox" data-lecture="4.4"><span><b>4.4</b><i>Types</i><small>SLL, CSLL, DLL, CDLL</small></span></label><label><input type="checkbox" data-lecture="4.5A"><span><b>4.5A</b><i>SLL setup</i><small>Traversal and length</small></span></label><label><input type="checkbox" data-lecture="4.5B"><span><b>4.5B</b><i>SLL insertion</i><small>Pointer order</small></span></label><label><input type="checkbox" data-lecture="4.5C"><span><b>4.5C</b><i>SLL search/delete</i><small>Complexity</small></span></label><label><input type="checkbox" data-lecture="4.6"><span><b>4.6</b><i>Circular SLL</i><small>Return-to-head stop</small></span></label><label><input type="checkbox" data-lecture="4.7"><span><b>4.7</b><i>Doubly LL</i><small>Two-way invariants</small></span></label><label><input type="checkbox" data-lecture="4.8"><span><b>4.8</b><i>Circular DLL</i><small>Four boundary links</small></span></label><label><input type="checkbox" data-lecture="4.9"><span><b>4.9</b><i>Problems + GATE</i><small>Middle, cycle, reverse</small></span></label></div></section>

 <section class="beginner-start searchable" id="zero-start" data-title="Zero-start mental model"><div class="zero-title"><span>ZERO START</span><h2>Har node ek ghar hai; next us ghar se agle ghar ka address.</h2><p>Head ke paas first address hai. Jis node tak head se links follow karke nahi pahunch sakte, woh logical list ka part nahi.</p></div><div class="glossary-grid"><article><b>Node</b><p>Data + one or more link fields.</p></article><article><b>Head</b><p>First node ka reference; empty mein None.</p></article><article><b>Tail</b><p>Last node reference, agar maintain kiya ho.</p></article><article><b>Next</b><p>Successor node ka reference.</p></article><article><b>Prev</b><p>DLL mein predecessor reference.</p></article><article><b>Reachable</b><p>Head se link path follow karke milne wala node.</p></article></div><div class="linked-chain"><span><b>10</b><i>next</i></span><em>→</em><span><b>20</b><i>next</i></span><em>→</em><span><b>30</b><i>None</i></span></div><div class="reading-method"><h3>Pointer question protocol</h3><div><span><b>1</b>Draw nodes</span><span><b>2</b>Label refs</span><span><b>3</b>Save links</span><span><b>4</b>Recheck invariants</span></div></div></section>

 <section class="beginner-start searchable" id="pointer-vocabulary" data-title="Next current and reachable"><div class="zero-title"><span>READ THIS SLOWLY</span><h2><code>next</code>, <code>current</code> aur <code>reachable</code> alag concepts hain.</h2><p>Linked list ko samajhne ke liye pehle node ke andar ka reference aur traversal ke temporary reference ko alag dekho.</p></div><div class="linked-chain"><span><b>Node A</b><i>next → B</i></span><em>→</em><span><b>Node B</b><i>next → C</i></span><em>→</em><span><b>Node C</b><i>next → None</i></span></div><div class="two-grid"><article><h3><code>next</code> kya hai?</h3><p><code>next</code> har node ke andar rakha hua link/reference hai. Diagram mein Node A ka <code>next</code> Node B ka address rakhta hai; Node B ka <code>next</code> Node C ka address rakhta hai. Last node ke baad koi node nahi, isliye Node C ka <code>next = None</code>.</p></article><article><h3><code>current</code> kya hai?</h3><p><code>current</code> node ka field nahi hota. Ye traversal ke liye banaya gaya temporary naam hai, jo ek waqt mein ek node ka reference hold karta hai. Pehle current → A, phir current → B, phir current → C.</p></article></div><div class="callout"><b><code>reachable</code> ka meaning</b><p><code>reachable</code> koi pointer ya variable nahi, balki node ki property hai. Head se arrows follow karke jis node tak pahunch sakte ho, woh node reachable hai. Upar ke diagram mein A, B aur C teeno head se reachable hain. Agar C ka address head se follow karke nahi milta, toh C reachable nahi hoga—even agar C memory mein exist karta ho.</p></div><div class="equation"><span>Traversal ka simple idea</span><b>current = current.next</b></div><p>Iska meaning: current jis node par hai, us node ke <code>next</code> link ko follow karo aur current ko agle node par shift karo. Jab current <code>None</code> ho jaaye, aage koi reachable node nahi bacha.</p></section>

 <section class="chapter searchable" id="intro" data-title="4.1–4.2 · Introduction and memory">${b(`4.1–4.2`,`FOUNDATION`,`Introduction and Memory`,`Linked list kya hai aur logical order references se kaise banta hai.`)}
  <div class="two-grid"><article><h3>Node anatomy</h3><p>SLL node: <code>data</code> and <code>next</code>. Python “pointer” practically object reference hai; raw address arithmetic nahi.</p></article><article><h3>Memory</h3><p>Nodes memory mein alag-alag jagah par ho sakte hain. Isse insertion/deletion flexible hota hai, lekin har node ke liye extra <code>next</code> reference aur object memory lagti hai. Array/list mein data comparatively compact hota hai. Alag-alag jagah hone ki wajah se CPU ko nearby data ka cache benefit bhi kam milta hai, isliye traversal practically slower ho sakta hai.</p></article></div><div class="codebox"><div><span>Minimal node</span><button>Copy</button></div><pre><code>class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

head = Node(10)</code></pre></div><div class="danger"><b>Reachability trap</b><p>Head ka old reference overwrite karne se pehle required link save karo. Otherwise remaining chain logically lose ho sakti hai.</p></div>
 </section>

 <section class="chapter searchable" id="compare" data-title="4.3 · Linked lists vs arrays">${b(`4.3`,`TRADE-OFF`,`Linked Lists vs Arrays`,`Indexing, insertion, memory aur cache locality ka trade-off.`)}
  <div class="table-wrap"><table><thead><tr><th>Property</th><th>Array/Python list</th><th>Linked list</th></tr></thead><tbody><tr><td>Index access</td><td>O(1)</td><td>O(n) worst</td></tr><tr><td>Search unsorted</td><td>O(n)</td><td>O(n)</td></tr><tr><td>Insert at known place</td><td>may shift O(n)</td><td>rewire O(1)*</td></tr><tr><td>Find position</td><td>index direct</td><td>traverse O(n)</td></tr><tr><td>Memory</td><td>compact/reference slots</td><td>per-node links/objects</td></tr><tr><td>Cache locality</td><td>generally better</td><td>generally weaker</td></tr></tbody></table></div><div class="callout"><b>*“Known place” ka exact meaning</b><p>Agar predecessor node <code>prev</code> ka reference pehle se available hai, toh singly linked list mein do links update hote hain: <code>new.next = prev.next</code>, phir <code>prev.next = new</code>. Isliye insertion/rewiring O(1) hai. Lekin agar sirf “position 500 par insert karo” diya hai, toh pehle position 500 tak traverse karke <code>prev</code> dhoondna O(n) hoga; total cost O(n) + O(1) = O(n). DLL mein previous aur next dono directions ke links update karne padte hain, par constant count hone ki wajah se rewiring phir bhi O(1) rehti hai.</p></div><div class="danger"><b>GATE 2025 lesson</b><p>Sorted linked list standard binary search ko O(log n) nahi banati because middle node direct O(1) access nahi.</p></div>
 </section>

 <section class="chapter searchable" id="types" data-title="4.4 · Types of linked lists">${b(`4.4`,`FOUR TYPES`,`Types of Linked Lists`,`SLL, CSLL, DLL aur CDLL ko termination aur direction se identify karo.`)}
  <div class="table-wrap"><table><thead><tr><th>Type</th><th>Links/node</th><th>End condition</th><th>Direction</th></tr></thead><tbody><tr><td>SLL</td><td>next</td><td>tail.next=None</td><td>forward</td></tr><tr><td>CSLL</td><td>next</td><td>tail.next=head</td><td>forward circular</td></tr><tr><td>DLL</td><td>prev,next</td><td>head.prev/tail.next=None</td><td>both</td></tr><tr><td>CDLL</td><td>prev,next</td><td>head.prev=tail; tail.next=head</td><td>both circular</td></tr></tbody></table></div>
  <div class="ll-type-grid">
   <article class="ll-type-card"><header><h3>SLL</h3><span>sirf forward</span></header><div class="mini-list"><span class="mini-node head"><b>A</b><i>next</i></span><em>→</em><span class="mini-node"><b>B</b><i>next</i></span><em>→</em><span class="mini-node tail"><b>C</b><i>None</i></span></div><p>Har node mein ek <code>next</code> link. Tail ke baad <code>None</code>.</p></article>
   <article class="ll-type-card"><header><h3>CSLL</h3><span>forward circular</span></header><div class="mini-list"><span class="mini-node head"><b>A</b><i>next</i></span><em>→</em><span class="mini-node"><b>B</b><i>next</i></span><em>→</em><span class="mini-node tail"><b>C</b><i>next</i></span></div><span class="circular-return">TAIL.next wapas HEAD ko point karta hai</span><p>Tail ka <code>next</code> None nahi; wapas head ko point karta hai.</p></article>
   <article class="ll-type-card"><header><h3>DLL</h3><span>forward + backward</span></header><div class="mini-list double"><span class="mini-node head"><i>None</i><b>A</b><i>next</i></span><em>⇄</em><span class="mini-node"><i>prev</i><b>B</b><i>next</i></span><em>⇄</em><span class="mini-node tail"><i>prev</i><b>C</b><i>None</i></span></div><p>Har node mein <code>prev</code> aur <code>next</code>. Dono ends par <code>None</code>.</p></article>
   <article class="ll-type-card"><header><h3>CDLL</h3><span>both directions circular</span></header><div class="mini-list double"><span class="mini-node head"><i>prev</i><b>A</b><i>next</i></span><em>⇄</em><span class="mini-node"><i>prev</i><b>B</b><i>next</i></span><em>⇄</em><span class="mini-node tail"><i>prev</i><b>C</b><i>next</i></span></div><span class="circular-return">HEAD.prev = TAIL aur TAIL.next = HEAD</span><p>First aur last node dono directions mein connected hain; koi end <code>None</code> nahi.</p></article>
  </div><div class="danger"><b>Circular loop</b><p><code>while current:</code> valid circular list mein terminate nahi karega. Start node par return ya exactly length nodes ke baad stop.</p></div>
 </section>

 <section class="chapter searchable" id="sll-setup" data-title="4.5 · SLL setup and traversal">${b(`4.5A`,`SINGLY LL`,`Head se None tak forward walk`,`Every iteration progress statement required.`)}
  <div class="codebox"><div><span>Complete beginner implementation</span><button>Copy</button></div><pre><code>class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)

        if self.head is None:
            self.head = new_node
            return

        current = self.head

        while current.next:
            current = current.next

        current.next = new_node

    def get_length(self):
        length = 0
        current = self.head

        while current:
            length += 1
            current = current.next

        return length

    def print_list(self):
        current = self.head

        while current:
            print(current.data)
            current = current.next</code></pre></div>

  <div class="zero-title"><span>PART 1 · NODE</span><h2><code>Node</code> ek data box aur next address box banata hai.</h2></div>
  <div class="two-grid"><article><h3><code>class Node</code></h3><p>Ye blueprint hai. Har baar <code>Node(value)</code> call karne par ek naya node object banta hai.</p></article><article><h3><code>self.data = data</code></h3><p>Node ke andar actual value save hoti hai. Agar <code>Node(10)</code> banaya, toh is node ka <code>data = 10</code>.</p></article><article><h3><code>self.next = None</code></h3><p>Naya node abhi kisi agle node se connected nahi hai. Isliye uska next reference initially <code>None</code> rakha gaya.</p></article><article><h3>Initial picture</h3><p><code>new_node = Node(10)</code> ke baad node memory mein exist karta hai, lekin jab tak head ya kisi existing node ka next use point na kare, woh list se connected nahi hai.</p></article></div>
  <div class="linked-chain"><span><b>10</b><i>next → None</i></span></div>

  <div class="zero-title"><span>PART 2 · LIST</span><h2><code>head</code> poori linked list ka entry point hai.</h2></div>
  <div class="two-grid"><article><h3><code>class LinkedList</code></h3><p>Ye poori list ka blueprint hai. Nodes alag objects hain; LinkedList un tak pahunchne ke liye head reference rakhti hai.</p></article><article><h3><code>self.head = None</code></h3><p>New list mein abhi koi node nahi, isliye head kisi object ko point nahi karta. Diagram: <code>HEAD → None</code>. Isi ko empty linked list kehte hain.</p></article></div>

  <div class="zero-title"><span>PART 3 · APPEND</span><h2>Append ka goal: naya node list ke bilkul end mein jodna.</h2></div>
  <div class="steps"><article><b>1</b><h3>Node banao</h3><p><code>new_node = Node(data)</code> se new node banta hai. Abhi iska <code>next = None</code>.</p></article><article><b>2</b><h3>Empty check</h3><p><code>if self.head is None</code> check karta hai ki list khaali hai ya nahi.</p></article><article><b>3</b><h3>First insertion</h3><p>Empty list mein <code>self.head = new_node</code>. Head ab first node ko point karta hai. <code>return</code> function ko yahin rokta hai.</p></article><article><b>4</b><h3>Last node find</h3><p>Non-empty list mein current ko head par rakho aur next links follow karo.</p></article><article><b>5</b><h3>Connect</h3><p>Jis node ka next None mila wahi old tail hai. <code>current.next = new_node</code> usko new node se connect karta hai.</p></article></div>
  <div class="callout"><b><code>while current.next</code> kyun?</b><p>Loop tab tak chalta hai jab current ke baad koi node present hai. Loop stop hote waqt <code>current</code> last node par hota hai. Agar yahan <code>while current</code> use karke current ko aage badhate, toh loop ke baad current <code>None</code> hota aur uska <code>next</code> update nahi kar sakte.</p></div>
  <div class="linked-chain"><span><b>HEAD → 10</b><i>next</i></span><em>→</em><span><b>20</b><i>next</i></span><em>→</em><span><b>30</b><i>None</i></span></div>
  <div class="equation"><span>Append without stored tail</span><b>last node locate O(n) + link update O(1) = O(n)</b></div>

  <div class="zero-title"><span>PART 4 · LENGTH</span><h2><code>get_length()</code> head se walk karke nodes count karta hai.</h2></div>
  <div class="steps"><article><b>1</b><h3>Counter zero</h3><p><code>length = 0</code>, kyunki traversal start hone se pehle zero nodes count hue hain.</p></article><article><b>2</b><h3>Start at head</h3><p><code>current = self.head</code>. Empty list mein current None; non-empty mein first node.</p></article><article><b>3</b><h3>Node present?</h3><p><code>while current</code> tab tak true hai jab current kisi real node ko reference karta hai.</p></article><article><b>4</b><h3>Count and move</h3><p><code>length += 1</code> current node count karta hai; <code>current = current.next</code> agle node par le jaata hai.</p></article><article><b>5</b><h3>Return result</h3><p>Last node ke baad current None hota hai. Loop stop aur final count return.</p></article></div>
  <div class="callout"><b>Dry run: 10 → 20 → 30</b><p>Start: length 0, current 10. First round: length 1, current 20. Second: length 2, current 30. Third: length 3, current None. Function <code>3</code> return karega.</p></div>
  <div class="two-grid"><article><h3>Stored length nahi</h3><p>Har query mein saare n nodes count karne padte hain, isliye <code>get_length()</code> O(n) time leta hai aur sirf counter/current use karne se O(1) auxiliary space.</p></article><article><h3>Length variable maintain karo toh</h3><p><code>self.length</code> store karke query O(1) ho sakti hai. Lekin har successful insertion par exactly ek increment aur deletion par exactly ek decrement karna hoga.</p></article></div>

  <div class="zero-title"><span>PART 5 · PRINT</span><h2><code>print_list()</code> har reachable node ko visit karta hai.</h2></div>
  <div class="two-grid"><article><h3>Traversal</h3><p>Current head se start hota hai. Har iteration mein pehle current node ka data print hota hai, phir current next node par move karta hai.</p></article><article><h3>Termination</h3><p>Tail ka next None hota hai. Tail visit karne ke baad current None ban jaata hai, condition false hoti hai aur loop safely stop.</p></article></div>
  <div class="danger"><b>Progress line kabhi mat bhoolna</b><p>Agar <code>current = current.next</code> remove kar diya, current same node par rahega aur <code>while current</code> infinite loop ban jayega.</p></div>

  <div class="zero-title"><span>BOUNDARY CASES</span><h2>Empty aur singleton ko separately trace karo.</h2></div>
  <div class="two-grid"><article><h3>Empty list</h3><p><code>head = None</code>. Length loop zero baar chalega aur 0 return karega. Print loop bhi zero baar chalega. First append head ko new node par set karega.</p></article><article><h3>Singleton list</h3><p>Exactly one node: head us node ko point karta hai aur <code>head.next = None</code>. Length 1; print once; append ke traversal loop ki condition immediately false, so new node directly connect hota hai.</p></article></div>
 </section>

 <section class="chapter searchable" id="sll-insert" data-title="4.5 · SLL insertion">${b(`4.5B`,`POINTER ORDER`,`Old successor lose hone se pehle save karo`,`Rewiring O(1), locating may be O(n).`)}
  <div class="zero-title"><span>PEHLE WORDS SAMAJHO</span><h2>Successor, locating aur rewiring teen alag cheezein hain.</h2></div>
  <div class="three-grid"><article><span>Current</span><h3>Jis node par hum khade hain</h3><p>Agar <code>current → A</code>, toh current A node ka reference hold karta hai.</p></article><article><span>Successor</span><h3>Current ke immediately baad wala node</h3><p>List A → B mein A ka successor B hai; code mein <code>current.next</code>.</p></article><article><span>Rewiring</span><h3>Stored references change karna</h3><p>Nodes move nahi hote. Sirf unke <code>next</code> references ko naye addresses diye jaate hain.</p></article></div>

  <div class="zero-title"><span>CASE 1 · BEGINNING</span><h2>New node ko head se pehle insert karna.</h2><p>Original list mein head A ko point karta hai. X insert karne ke baad X new first node banega.</p></div>
  <div class="linked-chain"><span><b>HEAD → A</b><i>next</i></span><em>→</em><span><b>B</b><i>None</i></span></div>
  <div class="codebox green"><div><span>Correct pointer order</span><button>Copy</button></div><pre><code>node.next = self.head
self.head = node</code></pre></div>
  <div class="steps"><article><b>1</b><h3><code>node.next = self.head</code></h3><p>Head abhi A ko point karta hai, isliye X ka next A banega. Temporary picture: <code>X → A → B</code>, lekin head abhi A par hai.</p></article><article><b>2</b><h3><code>self.head = node</code></h3><p>Ab head ko X par shift karte hain. Final list: <code>HEAD → X → A → B → None</code>.</p></article></div>
  <div class="linked-chain"><span><b>HEAD → X</b><i>next</i></span><em>→</em><span><b>A</b><i>next</i></span><em>→</em><span><b>B</b><i>None</i></span></div>
  <div class="callout"><b>Beginning insertion O(1) kyun?</b><p>List mein 2 nodes hon ya 20 lakh, exactly do references update hote hain. Koi traversal nahi, isliye time O(1).</p></div>

  <div class="danger"><b>Beginning mein order reverse mat karo</b><p>Agar pehle <code>self.head = node</code> kar diya, head X ho jayega. Uske baad <code>node.next = self.head</code> ka meaning X.next = X hoga. X khud ko point karega aur old list A → B head se unreachable ho jayegi.</p></div>
  <div class="equation"><span>Wrong result</span><b>HEAD → X ↻ X &nbsp; | &nbsp; A → B lost from head</b></div>

  <div class="zero-title"><span>CASE 2 · AFTER KNOWN CURRENT</span><h2>Aur B ke beech X insert karna.</h2><p>Maan lo actual A node ka reference already available hai: <code>current → A</code>. A ka old successor B hai.</p></div>
  <div class="linked-chain"><span><b>current → A</b><i>next → B</i></span><em>→</em><span><b>B</b><i>next → C</i></span><em>→</em><span><b>C</b><i>None</i></span></div>
  <div class="codebox"><div><span>Correct pointer order</span><button>Copy</button></div><pre><code>node.next = current.next
current.next = node</code></pre></div>
  <div class="steps"><article><b>1</b><h3>Old successor preserve karo</h3><p><code>node.next = current.next</code>. Current A hai aur A.next B hai, isliye X.next B banega. Ab X se remaining B → C chain safe hai.</p></article><article><b>2</b><h3>Current ko new node se jodo</h3><p><code>current.next = node</code>. A ka next ab X hai. Final chain A → X → B → C.</p></article></div>
  <div class="linked-chain"><span><b>current → A</b><i>next → X</i></span><em>→</em><span><b>X</b><i>next → B</i></span><em>→</em><span><b>B</b><i>next → C</i></span><em>→</em><span><b>C</b><i>None</i></span></div>

  <div class="danger"><b>Update-order bug: self-loop kaise banta hai?</b><p>Wrong order mein pehle <code>current.next = node</code> karne se A.next ka old B reference overwrite ho jaata hai aur A.next X ban jaata hai. Ab <code>node.next = current.next</code> mein current.next already X hai, isliye X.next = X. Result: A → X ↻ X; B → C chain head se unreachable.</p></div>
  <div class="callout"><b>Yaad rakhne ka rule</b><p><strong>Pehle naye node ko aage wale node ka haath pakdao; phir peeche wale node ko naye node se jodo.</strong> Isi liye old successor lose hone se pehle preserve karte hain.</p></div>

  <div class="zero-title"><span>COMPLEXITY TRAP</span><h2>“Known current” position number nahi—actual node reference hai.</h2></div>
  <div class="two-grid"><article><h3>Current already available</h3><p>Agar <code>current → A</code> pehle se diya hai, toh sirf do link assignments. Locate O(1), rewire O(1), total O(1).</p></article><article><h3>Sirf position di hai</h3><p>“Position 500 ke baad insert karo” mein head se 500 tak traverse karna padega. Locate O(n), rewire O(1), total O(n).</p></article></div>
  <div class="equation"><span>Total insertion cost</span><b>locating cost + rewiring cost</b></div>

  <div class="zero-title"><span>CASE 3 · END</span><h2>Tail reference maintain karne se append O(1) ho sakta hai.</h2></div>
  <div class="two-grid"><article><h3>Sirf head available</h3><p>Head se next links follow karke last node find karna padega. Last locate O(n), final link update O(1), total O(n).</p></article><article><h3>Tail maintained</h3><p>Tail already last node ko point karta hai. <code>tail.next = node</code> se new node connect karo, phir <code>tail = node</code> se tail shift karo. Total O(1).</p></article></div>
  <div class="codebox"><div><span>Append when tail is maintained</span><button>Copy</button></div><pre><code>tail.next = node
tail = node</code></pre></div>
  <div class="linked-chain"><span><b>HEAD → A</b><i>next</i></span><em>→</em><span><b>B</b><i>next</i></span><em>→</em><span><b>TAIL → X</b><i>None</i></span></div>
  <div class="danger"><b>Empty-list boundary</b><p>Empty list mein old tail nahi hota. First insertion ke baad head aur tail dono same new node ko point karenge, aur new node ka next None rahega.</p></div>
 </section>

 <section class="chapter searchable" id="sll-ops" data-title="4.5 · SLL search, deletion and complexity">${b(`4.5C`,`DELETE`,`Node ko bypass karo`,`Deletion cost ko locate + rewire mein decompose karo.`)}
  <div class="codebox"><div><span>Delete p when predecessor q known</span><button>Copy</button></div><pre><code>q.next = p.next
p.next = None  # optional explicit detach
# rewiring O(1); finding q/p may be O(n)</code></pre></div><div class="table-wrap"><table><thead><tr><th>Operation</th><th>Only head</th><th>With tail / known node</th></tr></thead><tbody><tr><td>Traverse/search</td><td>O(n)</td><td>O(n)</td></tr><tr><td>Insert/delete beginning</td><td>O(1)</td><td>O(1)</td></tr><tr><td>Insert end</td><td>O(n)</td><td>O(1) with tail</td></tr><tr><td>Delete end SLL</td><td>O(n)</td><td>still O(n) with tail alone*</td></tr><tr><td>Insert after known node</td><td>O(1)</td><td>O(1)</td></tr><tr><td>Delete after known predecessor</td><td>O(1)</td><td>O(1)</td></tr></tbody></table></div><small>*Tail predecessor directly available nahi in SLL.</small>
 </section>

 <section class="chapter searchable" id="csll" data-title="4.6 · Circular singly linked list">${b(`4.6`,`CSLL`,`Circular Singly Linked List`,`Tail ka next None nahi; wapas head ko point karta hai.`)}
  <div class="linked-chain"><span><b>H:10</b><i>next</i></span><em>→</em><span><b>20</b><i>next</i></span><em>→</em><span><b>T:30</b><i>→ H</i></span></div><div class="codebox"><div><span>Safe traversal</span><button>Copy</button></div><pre><code>if self.head is None:
    return
current = self.head
while True:
    visit(current)
    current = current.next
    if current is self.head:
        break</code></pre></div><div class="callout"><b>Lecture vs optimized</b><p>Notebook tail store nahi karta, isliye beginning/end insertion ke liye last node scan O(n). Tail maintain karke both O(1) kiye ja sakte hain.</p></div>
 </section>

 <section class="chapter searchable" id="dll" data-title="4.7 · Doubly linked list">${b(`4.7`,`DLL`,`Doubly Linked List`,`Prev aur next links ko har operation ke baad dono directions se verify karo.`)}
  <div class="linked-chain"><span><i>None</i><b>10</b></span><em>⇄</em><span><i>prev</i><b>20</b></span><em>⇄</em><span><i>prev</i><b>30</b></span></div><div class="codebox"><div><span>Insert node between q and p</span><button>Copy</button></div><pre><code>q.next = node
node.prev = q
node.next = p
p.prev = node</code></pre></div><div class="danger"><b>Half-update bug</b><p>Only next chain correct dikh sakti hai while prev chain broken ho. After operation verify: <code>x.next.prev is x</code> and <code>x.prev.next is x</code> wherever neighbors exist.</p></div><div class="callout"><b>Complexity nuance</b><p>Known node deletion O(1). Position-based deletion O(n) to locate + O(1) rewire. Head/tail insert/delete O(1).</p></div>
 </section>

 <section class="chapter searchable" id="cdll" data-title="4.8 · Circular doubly linked list">${b(`4.8`,`CDLL`,`Circular Doubly Linked List`,`Head aur tail prev/next dono directions mein cycle close karte hain.`)}
  <div class="equation"><span>Boundary invariant</span><b>head.prev = tail · tail.next = head</b></div><div class="two-grid"><article><h3>One node</h3><p><code>head is tail</code> and both <code>next</code>/<code>prev</code> point to itself.</p></article><article><h3>Delete boundary</h3><p>New head/tail choose karne ke baad both circular boundary links reconnect.</p></article></div><div class="codebox"><div><span>Insert at end</span><button>Copy</button></div><pre><code>node.prev = tail
node.next = head
tail.next = node
head.prev = node
tail = node</code></pre></div>
 </section>

 <section class="chapter searchable" id="coding" data-title="4.9 · Lecture coding problems">${b(`4.9`,`PROBLEMS`,`Lecture Coding Problems`,`Aggregation, middle convention aur circular termination ko trace karo.`)}
  <div class="practice-list"><article><span>01</span><div><b>Middle element</b><p>Stored length n//2 second-middle policy; fast/slow one-pass alternative.</p></div><strong>O(n) · O(1)</strong></article><article><span>02</span><div><b>Count circular nodes</b><p>Empty→0; non-empty head count then until return.</p></div><strong>O(n) · O(1)</strong></article><article><span>03</span><div><b>Sum nodes</b><p>Additive identity empty→0; one traversal.</p></div><strong>O(n) · O(1)</strong></article><article><span>04</span><div><b>Max/min</b><p>Initialize head.data, not 0; empty returns agreed sentinel.</p></div><strong>O(n) · O(1)</strong></article></div><div class="danger"><b>Even-length middle</b><p>Two middle nodes hote hain. Algorithm first ya second middle return karta hai—question convention explicit karo.</p></div>
 </section>

 <section class="chapter searchable" id="gate-patterns" data-title="GATE bridge · Fast/slow, cycle and reverse">${b(`GATE`,`ADD-ON`,`GATE Pointer Patterns`,`Ye lecture ke baad GATE ke liye extra reusable patterns hain.`)}
  <div class="callout"><b>Is section ka purpose</b><p>In patterns ko yaad karne ka goal nahi; pointer movement samajhna hai. GATE mein linked-list questions aksar poochte hain: middle kaise milega, cycle kaise detect hogi, end se k-th node kaise milega, ya list reverse karte waqt links kaise bachenge.</p></div><div class="three-grid"><article><span>01 · FAST/SLOW</span><h3>Middle aur cycle</h3><p><code>slow</code> ek step aur <code>fast</code> do steps chalta hai. Fast end par pahunchta hai toh slow middle par hota hai. Cycle ho toh dono eventually same node par mil sakte hain.</p><strong>Time O(n) · extra space O(1)</strong></article><article><span>02 · GAP POINTERS</span><h3>K-th node from end</h3><p>Pehle fast pointer ko <code>k</code> nodes aage bhejo. Phir slow aur fast ko saath move karo. Fast end par aayega toh slow k-th-from-end node par hoga.</p><strong>Time O(n) · extra space O(1)</strong></article><article><span>03 · THREE REFERENCES</span><h3>Reverse SLL</h3><p><code>prev</code>, <code>current</code> aur saved <code>next</code> use hote hain. Link todne se pehle next save karo, phir current ka arrow reverse karo.</p><strong>Time O(n) · extra space O(1)</strong></article></div><div class="codebox"><div><span>Iterative reverse · step order</span><button>Copy</button></div><pre><code>prev, current = None, head
while current:
    nxt = current.next
    current.next = prev
    prev = current
    current = nxt
head = prev
# O(n) time, O(1) auxiliary space</code></pre></div><div class="danger"><b>Identity vs value</b><p>Two lists intersect tab kehte hain jab same node object share karein; equal data values intersection prove nahi karte.</p></div>
 </section>

 <section class="chapter searchable" id="gate-examples" data-title="GATE bridge · Pattern examples">${b(`GATE`,`EXAMPLES`,`Pattern Examples`,`Ab teen common patterns ko concrete list par trace karo.`)}
  <div class="two-grid"><article><h3>Middle: 10 → 20 → 30 → 40</h3><p>Start slow=10, fast=10. Round 1 ke baad slow=20, fast=30. Round 2 ke baad slow=30, fast=None. Answer 30 (second-middle).</p></article><article><h3>K-th from end: k=2</h3><p>List 10 → 20 → 30 → 40 → 50. Standard 1-based counting mein end se first 50 aur second 40 hai. Two-pointer trace ka final slow bhi 40 par rukta hai.</p></article></div>
  <div class="callout"><b>Reverse ka mini-trace</b><p>Before: 10 → 20 → 30 → None. Har iteration mein pehle <code>nxt</code> save hota hai, phir current arrow ulta hota hai. Final: 30 → 20 → 10 → None. Agar next pehle save nahi kiya, remaining chain lose ho sakti hai.</p></div>
 </section>

 <section class="chapter searchable" id="protocol" data-title="GATE solving protocol">${b(`GATE`,`FINAL CHECK`,`GATE Solving Protocol`,`Har pointer mutation ke baad reachability aur boundary invariants recheck karo.`)}
  <div class="steps"><article><b>1</b><h3>Draw</h3><p>Distinct node boxes.</p></article><article><b>2</b><h3>Label</h3><p>head/tail/current.</p></article><article><b>3</b><h3>Save</h3><p>Old next before overwrite.</p></article><article><b>4</b><h3>Rewire</h3><p>One statement at a time.</p></article><article><b>5</b><h3>Audit</h3><p>Ends/cycle/reachability.</p></article></div><div class="final"><h3>Module 4 mastery</h3><p>Empty, singleton, head, tail, middle and circular cases ka exact pointer diagram bana sako.</p><button data-jump="practice">Practice Lab open karo →</button></div>
 </section>
</div>

<div class="view" data-panel="pyq"><section class="page-hero searchable" data-title="Evidence summary"><p class="eyebrow"><i></i> 2024–2026 honest analysis</p><h1>Linked List PYQ Evidence</h1><p>One direct linked-list question mila; one sequence-reversal question concept transfer ke liye separately labelled hai.</p><div class="paper-grid"><span><b>1</b>direct PYQ</span><span><b>1</b>transfer PYQ</span><span><b>2025</b>access-cost signal</span></div></section><section class="trend searchable" data-title="Inference"><h2>Paper kya signal deta hai?</h2><div><p><span>Access model</span><i style="--w:100%"></i><b>Directly tested</b></p><p><span>Complexity nuance</span><i style="--w:95%"></i><b>High value</b></p><p><span>Pointer tracing</span><i style="--w:75%"></i><b>Future-ready</b></p><p><span>Direct frequency</span><i style="--w:34%"></i><b>1 of 3 papers</b></p></div><small>Only three DA papers exist; low count ko omission guarantee mat samjho.</small></section><div class="filters"><button class="filter active" data-year="all">All</button><button class="filter" data-year="2024">2024 transfer</button><button class="filter" data-year="2025">2025 direct</button><button id="expand">Expand all</button></div><section class="pyqs">${ne}</section></div>

<div class="view" data-panel="practice"><section class="page-hero practice-head searchable" data-title="Practice Lab"><p class="eyebrow"><i></i> Pointer-state drills</p><h1>Module 4 Practice</h1><p>${v} distinct questions; har operation ke saath pointer diagram banao.</p><div class="practice-summary"><span><b>${_.length}</b>topic sets</span><span><b>18</b>GATE pointer traces</span><span><b>saved</b>attempt progress</span></div></section><section class="practice-controls searchable" data-title="Choose topic"><div><label for="practiceTopic">Lecture topic</label><select id="practiceTopic">${y}</select></div><div><label for="practiceDifficulty">Difficulty</label><select id="practiceDifficulty"><option value="all">All levels</option><option>Foundation</option><option>Core</option><option>Practice</option></select></div><div class="practice-score"><span>Attempted</span><b id="practiceScore">0/0</b></div></section><section class="practice-context" id="practiceContext"></section><section class="question-list" id="questionList"></section></div>

<div class="view" data-panel="revision"><section class="page-hero revision-head searchable" data-title="Revision sheet"><p class="eyebrow"><i></i> Last-day recall</p><h1>Module 4 Revision</h1><p>Invariants and complexity in one sheet.</p><button id="print">Print sheet</button></section><section class="revision-grid"><article class="rev"><span>01</span><h2>SLL</h2><ul><li>tail.next=None</li><li>forward only</li><li>head insert/delete O(1)</li><li>end delete O(n)</li></ul></article><article class="rev"><span>02</span><h2>CSLL</h2><ul><li>tail.next=head</li><li>no None termination</li><li>stop on return to head</li><li>tail enables O(1) end ops</li></ul></article><article class="rev"><span>03</span><h2>DLL</h2><ul><li>prev + next</li><li>head.prev=None</li><li>tail.next=None</li><li>known-node deletion O(1)</li></ul></article><article class="rev"><span>04</span><h2>CDLL</h2><ul><li>head.prev=tail</li><li>tail.next=head</li><li>singleton links self</li><li>audit both directions</li></ul></article><article class="rev"><span>05</span><h2>Complexity</h2><ul><li>index/search O(n)</li><li>rewire O(1) if node known</li><li>locate by position O(n)</li><li>overall space O(n)</li></ul></article><article class="rev"><span>06</span><h2>Patterns</h2><ul><li>slow/fast middle-cycle</li><li>gap pointers kth from end</li><li>reverse with saved next</li><li>intersection uses identity</li></ul></article><article class="rev warning"><span>07</span><h2>Never assume</h2><ul><li>all insertion O(1)</li><li>sorted LL binary search O(log n)</li><li>circular loop reaches None</li><li>tail makes SLL delete-end O(1)</li><li>same value means same node</li></ul></article></section></div>
</main></div><button class="menu" id="menu">☰</button><div class="toast">Copied</div>`;var x=`
<section class="chapter searchable" id="sll-setup" data-title="4.5.1 · SLL Initial Setup">${b(`4.5.1`,`INITIAL SETUP`,`SLL Initial Setup`,`Node, head, length aur display ka base structure.`)}
 <div class="codebox"><div><span>Node + empty SLL + helpers</span><button>Copy</button></div><pre><code>class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def get_length(self):
        length = 0
        current = self.head
        while current:
            length += 1
            current = current.next
        return length

    def display(self):
        if not self.head:
            print('Empty list')
        else:
            current = self.head
            while current:
                print(current.data, end=' ')
                current = current.next
            print()</code></pre></div>
 <div class="steps"><article><b>1</b><h3>Node blueprint</h3><p>Har node ke andar <code>data</code> aur agle node ka <code>next</code> reference. Naya node initially kisi se connected nahi, isliye next None.</p></article><article><b>2</b><h3>List blueprint</h3><p><code>self.head</code> first node ka reference hai. New list empty hai, isliye head None.</p></article><article><b>3</b><h3>Length</h3><p>Current head se start karke har reachable node par counter ek badhta hai. None milte hi return. O(n) time.</p></article><article><b>4</b><h3>Display</h3><p>Empty case pehle check. Otherwise current har node ka data print karke next par move karta hai.</p></article></div>
 <div class="linked-chain"><span><b>HEAD → A</b><i>next</i></span><em>→</em><span><b>B</b><i>next</i></span><em>→</em><span><b>C</b><i>None</i></span></div>
 <div class="danger"><b>Progress statement</b><p><code>current = current.next</code> missing hua toh current same node par rahega aur loop infinite ho jayega.</p></div>
</section>

<section class="chapter searchable" id="sll-insert-beginning" data-title="4.5.2 · Insertion At Beginning">${b(`4.5.2`,`INSERT BEGINNING`,`Insertion At Beginning`,`Old head ka reference new node mein save karke HEAD shift karo.`)}
 <div class="codebox green"><div><span>insert_at_beginning</span><button>Copy</button></div><pre><code>def insert_at_beginning(self, value):
    new_node = Node(value)
    if self.head:
        new_node.next = self.head  # self.head first node ka reference rakhta hai;
                                   # old first node ka reference new node mein save kiya
    self.head = new_node           # HEAD ko old first node se new node par shift kiya</code></pre></div>
 <div class="linked-chain"><span><b>Before: HEAD → A</b><i>next → B</i></span><em>→</em><span><b>B</b><i>None</i></span></div>
 <div class="steps"><article><b>1</b><h3>New node</h3><p><code>Node(value)</code> se X banta hai; X.next initially None.</p></article><article><b>2</b><h3>Old first node ka reference lo</h3><p><code>self.head</code> old first node A ka reference rakhta hai. <code>new_node.next = self.head</code> se wahi reference X ke next mein save hota hai; ab X.next A hai.</p></article><article><b>3</b><h3>HEAD shift karo</h3><p><code>self.head = new_node</code> se HEAD old first node A se shift hokar X ko point karta hai. Ab X new first node hai aur A uske baad safe connected hai.</p></article></div>
 <div class="linked-chain"><span><b>After: HEAD → X</b><i>next → A</i></span><em>→</em><span><b>A</b><i>next → B</i></span><em>→</em><span><b>B</b><i>None</i></span></div>
 <div class="danger"><b>Order reverse mat karo</b><p>Pehle head = node aur phir node.next = head karoge toh X.next X banega: self-loop. Correct rule: pehle X ko old head se jodo, phir head shift karo.</p></div>
 <div class="equation"><span>Complexity</span><b>fixed reference updates = O(1) time</b></div>
</section>

<section class="chapter searchable" id="sll-insert-end" data-title="4.5.3 · Insertion At End">${b(`4.5.3`,`INSERT END`,`Insertion At End`,`Last node find karke new node ko end mein connect karo.`)}
 <div class="codebox"><div><span>append / insert_at_end</span><button>Copy</button></div><pre><code>def append(self, data):
    new_node = Node(data)

    if self.head is None:
        self.head = new_node
        return

    current = self.head
    while current.next:
        current = current.next

    current.next = new_node</code></pre></div>
 <div class="steps"><article><b>1</b><h3>Node create</h3><p>New node ka next None, isliye end node banne ke liye ready.</p></article><article><b>2</b><h3>Empty case</h3><p>Head None hai toh new node first aur last dono hai. Head set karke return.</p></article><article><b>3</b><h3>Traversal</h3><p>Current head se start. <code>while current.next</code> tab tak move karta hai jab next node exist kare.</p></article><article><b>4</b><h3>Stop at tail</h3><p>Loop ke baad current wahi node hai jiska next None. <code>current.next = new_node</code> new tail connect karta hai.</p></article></div>
 <div class="linked-chain"><span><b>HEAD → A</b><i>next</i></span><em>→</em><span><b>B</b><i>next</i></span><em>→</em><span><b>old tail C</b><i>next → X</i></span><em>→</em><span><b>new tail X</b><i>None</i></span></div>
 <div class="callout"><b><code>while current.next</code> kyun?</b><p>Humein last real node par rukna hai taaki uska next update kar saken. <code>while current</code> ke baad current None ho jaata.</p></div>
 <div class="equation"><span>Only head</span><b>tail locate O(n) + link O(1) = O(n)</b></div>
 <div class="callout"><b>Tail maintain ho toh</b><p><code>tail.next = new_node</code>, phir <code>tail = new_node</code>. Direct last node available hone se O(1), lekin empty insertion mein head aur tail dono set karo.</p></div>
</section>

<section class="chapter searchable" id="sll-insert-middle" data-title="4.5.4 · Insertion In Middle">${b(`4.5.4`,`INSERT MIDDLE`,`Insertion In Middle`,`Requested position ke previous node tak jaakar links rewire karo.`)}
 <div class="codebox"><div><span>insert_at_position — simple version</span><button>Copy</button></div><pre><code>def insert_at_position(self, position, data):
    new_node = Node(data)

    current = self.head

    for _ in range(position - 1):
        current = current.next

    new_node.next = current.next
    current.next = new_node</code></pre></div>

 <div class="callout"><b>Position convention</b><p>Is code mein positions zero-based maani gayi hain: first node index 0, second index 1, third index 2. Ye simplified function position 1 ya uske baad insertion ke liye hai. Position 0 ke liye separately <code>insert_at_beginning()</code> use hoga.</p></div>

 <div class="zero-title"><span>EXAMPLE</span><h2>Four-node list mein position 2 par value 99 insert karni hai.</h2><p>Insertion se pehle position 2 par old node 30 hai. New node 99 position 2 lega; old 30 aur uske baad wala 40 safely aage connected rahenge.</p></div>
 <div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>position 2 → 30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>None</i></span></div>

 <div class="steps"><article><b>1</b><h3><code>new_node = Node(data)</code></h3><p>Data 99 ke saath naya node banta hai. Abhi new_node.next None hai aur node list se connected nahi.</p></article><article><b>2</b><h3><code>current = self.head</code></h3><p>HEAD first node 10 ka reference rakhta hai. Wahi reference current mein copy hota hai, isliye current bhi 10 ko point karta hai. Head change nahi hota.</p></article><article><b>3</b><h3><code>range(position - 1)</code></h3><p>Position 2 ke liye range(1), so loop ek baar chalta hai. Current 10 se 20 par aata hai. Position 2 wala old node 30 hai, lekin insertion ke liye current ko uske ek previous node 20 par hi rukna hai.</p></article></div>

 <div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>current → 20</b><i>next → 30</i></span><em>→</em><span><b>position 2 → 30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>None</i></span></div>

 <div class="two-grid"><article><h3><code>new_node.next = current.next</code></h3><p>Current 20 par hai aur current.next 30 ka reference rakhta hai. Ye reference new_node.next mein save hota hai. Ab 99.next → 30. Is step se remaining chain 30 → 40 safe rehti hai.</p></article><article><h3><code>current.next = new_node</code></h3><p>Ab 20 ka next, jo pehle 30 tha, new node 99 ko point karega. Isse 99, 20 aur 30 ke beech connect ho jaata hai.</p></article></div>

 <div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>current → 20</b><i>next → 99</i></span><em>→</em><span><b>position 2 → 99</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>None</i></span></div>

 <div class="callout"><b><code>position - 1</code> kyun?</b><p>Bilkul: position 2 insertion se pehle old node 30 ki position hai. Lekin link change old 30 par nahi, uske previous node 20 ke <code>next</code> mein karna hai. Isliye current index 1 wale 20 par rukta hai; phir 99 index 2 par insert hota hai.</p></div>
 <div class="danger"><b>Is simple version ki boundaries</b><p>Empty list mein current None hoga. Position 0 ko ye code correctly handle nahi karta. Position list se badi hui toh traversal ke dauraan current None ho sakta hai. Complete implementation mein empty check, position validation aur position 0 ko separately handle karna zaroori hai.</p></div>
 <div class="equation"><span>Complexity</span><b>previous node tak traversal O(position), worst O(n) · link updates O(1) · extra space O(1)</b></div>
</section>

<section class="chapter searchable" id="sll-search" data-title="4.5.5 · SLL Searching">${b(`4.5.5`,`SEARCH`,`SLL Searching`,`Current ko head se start karke har node ka data key se compare karo.`)}
 <div class="codebox"><div><span>Simple search</span><button>Copy</button></div><pre><code>def search(self, key):
    current = self.head

    position = 0

    while current:
        if current.data == key:
            print(f'{key} found at position {position}')
            return

        position += 1
        current = current.next</code></pre></div>

 <div class="zero-title"><span>EXAMPLE</span><h2>List mein key 20 search karni hai.</h2><p>Position zero-based hai: 10 ki position 0, 20 ki position 1 aur 30 ki position 2.</p></div>
 <div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>None</i></span></div>

 <div class="steps"><article><b>1</b><h3><code>current = self.head</code></h3><p>HEAD first node 10 ka reference rakhta hai. Wahi reference current ko milta hai, so traversal first node se start.</p></article><article><b>2</b><h3><code>position = 0</code></h3><p>Current ab first node par hai, aur zero-based indexing mein first node ki position 0 hoti hai.</p></article><article><b>3</b><h3><code>while current</code></h3><p>Jab tak current kisi real node ko point karta hai, loop chalega. Last node ke baad current None hoga aur loop stop.</p></article></div>

 <div class="linked-chain"><span><b>current → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>None</i></span></div>

 <div class="two-grid"><article><h3><code>if current.data == key</code></h3><p>Current node ka data requested key se compare hota hai. Pehli iteration mein 10 == 20 false, so print nahi hoga.</p></article><article><h3>Position aur current update</h3><p><code>position += 1</code> next node ki position ready karta hai. <code>current = current.next</code> current ko 10 se 20 par shift karta hai.</p></article></div>

 <div class="linked-chain"><span><b>10</b><i>next → 20</i></span><em>→</em><span><b>current → 20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>None</i></span></div>

 <div class="callout"><b>Match wali iteration</b><p>Ab current.data 20 aur key 20 hain, so condition true. Output: <code>20 found at position 1</code>. Agli line <code>return</code> poore search function ko turant stop kar deti hai. Is matching iteration mein position increment aur current movement execute nahi honge.</p></div>

 <div class="two-grid"><article><h3>Duplicate key</h3><p>Agar list <code>10 → 20 → 20</code> hai, first 20 milte hi return hoga. Sirf first matching position 1 print hogi.</p></article><article><h3>Key nahi mili</h3><p>Current next links follow karte hue None tak pahunch jayega. Is simple version mein separate “not found” message nahi hai, isliye function silently finish hoga.</p></article></div>
 <div class="danger"><b>Indentation important hai</b><p><code>return</code> if-block ke andar hai, isliye sirf match par function stop hota hai. <code>position += 1</code> aur <code>current = current.next</code> if-block ke bahar lekin while-loop ke andar hain, isliye non-matching node ke baad traversal aage badhta hai.</p></div>
 <div class="equation"><span>Complexity</span><b>best O(1) when head matches · worst O(n) · O(1) extra space</b></div>
</section>

<section class="chapter searchable" id="sll-delete-beginning" data-title="4.5.6 · Deletion At Beginning">${b(`4.5.6`,`DELETE BEGINNING`,`Deletion At Beginning`,`HEAD ko current first node se uske next node par shift karo.`)}
 <div class="codebox"><div><span>delete_first</span><button>Copy</button></div><pre><code>def delete_first(self):
    if self.head is None:
        return

    self.head = self.head.next</code></pre></div>
 <div class="linked-chain"><span><b>HEAD → A</b><i>next → B</i></span><em>→</em><span><b>B</b><i>next → C</i></span><em>→</em><span><b>C</b><i>None</i></span></div>
 <div class="steps"><article><b>1</b><h3><code>if self.head is None</code></h3><p>HEAD None hai toh list empty hai aur delete karne ke liye first node nahi. <code>return</code> function ko wahi stop karta hai.</p></article><article><b>2</b><h3><code>self.head.next</code></h3><p>HEAD A ka reference rakhta hai aur A.next B ka reference rakhta hai. Isliye <code>self.head.next</code> se second node B ka reference milta hai.</p></article><article><b>3</b><h3><code>self.head = self.head.next</code></h3><p>HEAD ko A se B par shift kar diya. Ab B new first node hai aur A head se reachable nahi raha.</p></article></div>
 <div class="linked-chain"><span><b>NEW HEAD → B</b><i>next → C</i></span><em>→</em><span><b>C</b><i>None</i></span></div>
 <div class="callout"><b>One-node list</b><p>Agar HEAD A ko point karta hai aur A.next None hai, toh assignment ke baad HEAD None ho jayega. List empty ho jayegi.</p></div>
 <div class="equation"><span>Complexity</span><b>fixed updates = O(1)</b></div>
</section>

<section class="chapter searchable" id="sll-delete-end" data-title="4.5.7 · Deletion At End">${b(`4.5.7`,`DELETE END`,`Deletion At End`,`Last node delete karne ke liye second-last node ka reference chahiye.`)}
 <div class="codebox"><div><span>Complete delete_last</span><button>Copy</button></div><pre><code>def delete_last(self):
    if self.head is None:
        return

    if self.head.next is None:
        self.head = None
        return

    previous_node = self.head
    current_node = self.head.next

    while current_node.next:
        previous_node = current_node
        current_node = current_node.next

    previous_node.next = None</code></pre></div>

 <div class="steps"><article><b>1</b><h3>Empty list</h3><p><code>self.head is None</code> ka matlab koi node nahi. Delete karne ke liye last node absent hai, isliye return.</p></article><article><b>2</b><h3>One-node list</h3><p><code>self.head.next is None</code> ka matlab HEAD only node ko point karta hai. Head None karte hi list empty; return.</p></article><article><b>3</b><h3>Two references</h3><p>Minimum two nodes confirmed. Previous first node par aur current second node par start hote hain.</p></article></div>

 <div class="linked-chain"><span><b>HEAD → A</b><i>next → B</i></span><em>→</em><span><b>current_node → B</b><i>next → C</i></span><em>→</em><span><b>C</b><i>next → D</i></span><em>→</em><span><b>D</b><i>None</i></span></div>
 <div class="callout"><b>Initial references</b><p><code>previous_node = self.head</code>, so previous A par. <code>current_node = self.head.next</code>, so current B par. Current ko last tak le jaate waqt previous usse exactly one node peeche rahega.</p></div>

 <div class="two-grid"><article><h3><code>while current_node.next</code></h3><p>Jab current ke baad koi node present hai, current abhi last nahi. Loop current ko aage move karta hai.</p></article><article><h3>Update order</h3><p>Pehle <code>previous_node = current_node</code>, phir <code>current_node = current_node.next</code>. Isse previous hamesha current se one step behind.</p></article></div>

 <div class="linked-chain"><span><b>HEAD → A</b><i>next → B</i></span><em>→</em><span><b>B</b><i>next → C</i></span><em>→</em><span><b>previous_node → C</b><i>next → D</i></span><em>→</em><span><b>current_node → D</b><i>None</i></span></div>
 <div class="callout"><b>Loop stop hone par</b><p><code>current_node.next</code> None hai, so current D last node hai. Previous C second-last node hai. <code>previous_node.next = None</code> se C new last node aur D list se disconnected.</p></div>
 <div class="linked-chain"><span><b>HEAD → A</b><i>next → B</i></span><em>→</em><span><b>B</b><i>next → C</i></span><em>→</em><span><b>C</b><i>None</i></span></div>

 <div class="codebox"><div><span>Alternative core traversal</span><button>Copy</button></div><pre><code>def delete_last(self):
    previous_node = self.head
    current_node = self.head.next

    while current_node.next:
        previous_node = current_node
        current_node = current_node.next

    previous_node.next = None</code></pre></div>
 <div class="danger"><b>Alternative kab use karna hai?</b><p>Ye same traversal logic ka compact version hai, lekin assume karta hai ki list mein at least two nodes hain. Empty list mein <code>self.head.next</code> fail karega; one-node list mein current_node None hoga aur <code>current_node.next</code> fail karega. Isliye standalone correct method ke liye upar wale two initial checks required hain.</p></div>
 <div class="equation"><span>Complexity</span><b>traversal O(n) + detach O(1) = O(n)</b></div>
</section>

<section class="chapter searchable" id="sll-delete-middle" data-title="4.5.8 · Deletion In Middle">${b(`4.5.8`,`DELETE MIDDLE`,`Deletion In Middle`,`Target node ko bypass karke previous aur next nodes reconnect karo.`)}
 <div class="codebox"><div><span>delete_from_middle — simple version</span><button>Copy</button></div><pre><code>def delete_from_middle(self, position):
    previous_node = self.head
    current_node = self.head.next

    for _ in range(position - 1):
        previous_node = current_node
        current_node = current_node.next

    previous_node.next = current_node.next</code></pre></div>
 <div class="callout"><b>Position convention</b><p>Position zero-based hai. Ye simple middle-deletion function position 1 ya uske baad ke node ke liye hai. Position 0 first-node deletion ka separate case hai.</p></div>

 <div class="zero-title"><span>EXAMPLE</span><h2>Four-node list se position 2 wala node delete karna hai.</h2><p>Position 2 par node 30 hai. Goal: 30 ko bypass karke 20 ko directly 40 se connect karna.</p></div>
 <div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>position 2 → 30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>None</i></span></div>

 <div class="steps"><article><b>1</b><h3><code>previous_node = self.head</code></h3><p>HEAD first node 10 ka reference rakhta hai. Wahi reference previous_node ko milta hai, so previous_node initially 10 par hai.</p></article><article><b>2</b><h3><code>current_node = self.head.next</code></h3><p>HEAD ka next second node 20 ka reference rakhta hai. Isliye current_node initially 20 par hai. Previous aur current ek node ke gap ke saath start hote hain.</p></article></div>

 <div class="linked-chain"><span><b>previous_node → 10</b><i>next → 20</i></span><em>→</em><span><b>current_node → 20</b><i>next → 30</i></span><em>→</em><span><b>position 2 → 30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>None</i></span></div>

 <div class="callout"><b><code>range(position - 1)</code> kyun?</b><p>Position 2 ke liye range(1), so loop ek baar chalega. Humein current_node ko delete target 30 par aur previous_node ko usse ek pehle 20 par lana hai.</p></div>

 <div class="two-grid"><article><h3><code>previous_node = current_node</code></h3><p>Previous ko current ki present location 20 ka reference milta hai. Ab previous_node 20 par.</p></article><article><h3><code>current_node = current_node.next</code></h3><p>Current apna next reference follow karke 20 se 30 par move karta hai. Ab current_node exactly delete target position 2 par.</p></article></div>

 <div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>previous_node → 20</b><i>next → 30</i></span><em>→</em><span><b>current_node → 30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>None</i></span></div>

 <div class="zero-title"><span>FINAL BYPASS</span><h2><code>previous_node.next = current_node.next</code></h2><p>Previous 20 par hai. Current 30 par hai. Current.next 40 ka reference rakhta hai. Assignment 40 ka reference directly 20.next mein daal deta hai.</p></div>
 <div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>previous_node → 20</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>None</i></span></div>

 <div class="callout"><b>Node 30 ka kya hua?</b><p>HEAD se path ab 10 → 20 → 40 hai. Koi reachable node 30 ko point nahi karta, isliye 30 logical linked list ka part nahi raha. Python eventually unreferenced object ko clean kar sakta hai.</p></div>
 <div class="danger"><b>Is simple version ki assumption</b><p>List mein enough nodes hain aur position valid middle position hai. Empty list, one-node list, position 0 aur out-of-range position ko ye exact code separately check nahi karta.</p></div>
 <div class="equation"><span>Complexity</span><b>target tak traversal O(position), worst O(n) · bypass O(1) · extra space O(1)</b></div>
</section>

<section class="chapter searchable" id="sll-complexity" data-title="4.5.9 · SLL Complexity Analysis">${b(`4.5.9`,`COMPLEXITY`,`SLL Complexity Analysis`,`Har operation mein traversal cost aur actual link-update cost separately count karo.`)}
 <div class="zero-title"><span>START HERE</span><h2><code>n</code> ka matlab list mein total nodes.</h2><p>Complexity machine ke seconds nahi batati. Ye batati hai ki input size n badhne par required operations kis rate se grow karte hain.</p></div>
 <div class="three-grid"><article><span>O(1)</span><h3>Constant time</h3><p>n kitna bhi ho, fixed number of statements/reference updates. Example: beginning deletion.</p></article><article><span>O(n)</span><h3>Linear time</h3><p>Worst case mein head se nodes ko one-by-one visit karna. n double hua toh work roughly double.</p></article><article><span>Auxiliary space</span><h3>Algorithm ki extra memory</h3><p>Input nodes ke alawa current, previous aur counter jaise temporary references count hote hain.</p></article></div>

 <div class="zero-title complexity-section-title"><span>MASTER TABLE</span><h2>Tumhare SLL implementation ki operation-wise complexity.</h2></div>
 <div class="table-wrap"><table><thead><tr><th>Operation</th><th>Best case</th><th>Worst case</th><th>Reason</th></tr></thead><tbody>
 <tr><td>Traversal / display</td><td>O(n)</td><td>O(n)</td><td>Har node visit karna hi goal hai</td></tr>
 <tr><td>Get length (stored nahi)</td><td>O(n)</td><td>O(n)</td><td>Saare nodes count hote hain</td></tr>
 <tr><td>Search with return</td><td>O(1)</td><td>O(n)</td><td>Head match vs last/absent key</td></tr>
 <tr><td>Insert at beginning</td><td>O(1)</td><td>O(1)</td><td>New.next aur head update only</td></tr>
 <tr><td>Insert at end</td><td>O(1) empty</td><td>O(n)</td><td>Non-empty list mein last node locate</td></tr>
 <tr><td>Insert at middle position</td><td>O(1) near head</td><td>O(n)</td><td>Previous node tak traversal</td></tr>
 <tr><td>Delete at beginning</td><td>O(1)</td><td>O(1)</td><td>Head = head.next</td></tr>
 <tr><td>Delete at end</td><td>O(1) empty/singleton</td><td>O(n)</td><td>Second-last node locate</td></tr>
 <tr><td>Delete at middle position</td><td>O(1) near head</td><td>O(n)</td><td>Target/previous tak traversal</td></tr>
 <tr><td>Space per node</td><td>O(1)</td><td>O(1)</td><td>Data + one next reference</td></tr>
 <tr><td>Overall n-node list space</td><td>O(n)</td><td>O(n)</td><td>n nodes × constant storage</td></tr>
 </tbody></table></div>

 <div class="callout"><b>Sabse important GATE rule</b><p><strong>Total cost = node locate karne ka cost + links update karne ka cost.</strong> Rewiring do assignments aur O(1) ho sakti hai, lekin agar correct node dhoondne mein O(n) traversal hua, total O(n) hoga.</p></div>

 <div class="zero-title complexity-section-title"><span>1 · TRAVERSAL</span><h2>Display aur length dono head se None tak chalte hain.</h2></div>
 <div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>None</i></span></div>
 <div class="two-grid"><article><h3>Time O(n)</h3><p>Four-node example mein 4 visits. General n-node list mein n visits. Display ko every value print karni hai aur length ko every node count karna hai, isliye best case bhi O(n).</p></article><article><h3>Extra space O(1)</h3><p>Loop poori new list nahi banata. Sirf one current reference aur length case mein one counter use hota hai; variables ki count n ke saath grow nahi karti.</p></article></div>
 <div class="equation"><span>Traversal work</span><b>T(n) = c·n + constant → O(n)</b></div>

 <div class="zero-title complexity-section-title"><span>2 · SEARCH</span><h2><code>return</code> ki wajah se best aur worst case different hain.</h2></div>
 <div class="three-grid"><article><span>Best O(1)</span><h3>Key head par</h3><p>First comparison true aur function return. Sirf one node visit.</p></article><article><span>Worst O(n)</span><h3>Key last par ya absent</h3><p>Current ko n nodes tak move karna padega.</p></article><article><span>Average O(n)</span><h3>Typical position</h3><p>Key uniformly kisi position par ho toh roughly n/2 nodes check; constants ignore hone se O(n).</p></article></div>
 <div class="danger"><b>n/2 ko O(n) kyun?</b><p>Asymptotic analysis constant factors ignore karti hai. n/2 ka growth n ke proportional hai, isliye O(n), O(n/2) final notation nahi.</p></div>

 <div class="zero-title complexity-section-title"><span>3 · INSERTION</span><h2>Beginning mein traversal nahi; end/middle mein location dhoondni padti hai.</h2></div>
 <div class="three-grid"><article><span>Beginning O(1)</span><h3>Two reference updates</h3><p><code>new_node.next = head</code> aur <code>head = new_node</code>. n independent.</p></article><article><span>End O(n)</span><h3>Last node locate</h3><p>Tumhare head-based append mein <code>while current.next</code> last node tak jaata hai; final connection O(1), total O(n).</p></article><article><span>Middle O(n)</span><h3>Previous position locate</h3><p>Loop O(position), worst position n ke proportional. Uske baad two link updates O(1).</p></article></div>
 <div class="equation"><span>Middle insertion</span><b>O(position) + O(1) = worst O(n)</b></div>

 <div class="zero-title complexity-section-title"><span>4 · DELETION</span><h2>Beginning direct hai; end aur middle mein predecessor locate hota hai.</h2></div>
 <div class="three-grid"><article><span>Beginning O(1)</span><h3>Head shift</h3><p><code>head = head.next</code> fixed one update. List size matter nahi.</p></article><article><span>End O(n)</span><h3>Second-last tak walk</h3><p>Previous/current references ko last tak move karna. Final <code>previous.next = None</code> only O(1).</p></article><article><span>Middle O(n)</span><h3>Target tak walk</h3><p>Position tak loop O(position), then <code>previous.next = current.next</code> O(1). Worst O(n).</p></article></div>
 <div class="equation"><span>Deletion pattern</span><b>locate O(n) + bypass O(1) = O(n)</b></div>

 <div class="zero-title complexity-section-title"><span>5 · SPACE</span><h2>Input storage aur auxiliary space ko mix mat karo.</h2></div>
 <div class="two-grid"><article><h3>Space per node O(1)</h3><p>Ek SLL node fixed fields rakhta hai: data aur one next reference. Har individual node ka storage constant.</p></article><article><h3>Overall list O(n)</h3><p>n nodes hain aur har node O(1) memory leta hai: n × O(1) = O(n).</p></article><article><h3>Iterative operations O(1) auxiliary</h3><p>Current, previous, position aur new_node jaise fixed references use hote hain. Extra variables n ke saath increase nahi.</p></article><article><h3>Output space separate</h3><p>Sirf values print karna stored output list create nahi karta. Agar n results ek new Python list mein collect karoge, output/extra space O(n) ho sakta hai.</p></article></div>

 <div class="zero-title complexity-section-title"><span>NUMERICAL FEEL</span><h2>Agar n = 1,000 nodes ho.</h2></div>
 <div class="table-wrap"><table><thead><tr><th>Operation</th><th>Approx node visits</th><th>Link updates</th><th>Final class</th></tr></thead><tbody><tr><td>Insert beginning</td><td>0</td><td>2</td><td>O(1)</td></tr><tr><td>Search last key</td><td>1,000</td><td>0</td><td>O(n)</td></tr><tr><td>Insert at position 600</td><td>about 600</td><td>2</td><td>O(n)</td></tr><tr><td>Delete beginning</td><td>0</td><td>1</td><td>O(1)</td></tr><tr><td>Delete last</td><td>about 1,000</td><td>1</td><td>O(n)</td></tr></tbody></table></div>

 <div class="danger"><b>Common GATE traps</b><p>“Linked-list insertion O(1)” tabhi correct hai jab required previous/current node already available ho. “Position p par insert” mein p tak traversal include karo. Search sorted hone se direct middle access nahi milta. Per-node space O(1) hone ka matlab complete list O(1) nahi—n nodes ka total O(n).</p></div>
 <div class="final"><h3>4.5.9 mastery check</h3><p>Har answer mein pehle batao: kitne nodes visit hue? kitne links update hue? extra variables kitne? Phir total time aur auxiliary space likho.</p></div>
</section>`,S=[...document.querySelectorAll(`#sll-setup,#sll-insert,#sll-ops`)];S.length&&(S[0].insertAdjacentHTML(`beforebegin`,x),S.forEach(e=>e.remove()));var C=`
<section class="chapter searchable" id="csll-intro" data-title="4.6 · Circular Singly Linked List">${b(`4.6`,`CSLL`,`Circular Singly Linked List`,`SLL jaisi next links hain, bas last node ka next None ke bajay head ko point karta hai.`)}
 <div class="zero-title"><span>PEHLE IDEA</span><h2>CSLL mein list khatam nahi hoti; last node se phir first node par aa jaate ho.</h2><p>Singly linked list mein 30.next = None hota tha. Circular singly linked list mein 30.next = head hota hai. Isliye circular list ko traverse karte waqt None ka wait nahi kar sakte.</p></div>
 <article class="ll-type-card"><header><h3>CSLL</h3><span>forward circular</span></header><div class="mini-list"><span class="mini-node head"><b>A</b><i>next</i></span><em>→</em><span class="mini-node"><b>B</b><i>next</i></span><em>→</em><span class="mini-node"><b>C</b><i>next</i></span><em>→</em><span class="mini-node tail"><b>D</b><i>next</i></span></div><span class="circular-return">TAIL.next wapas HEAD ko point karta hai</span><p>Tail ka <code>next</code> <code>None</code> nahi; wapas head ko point karta hai.</p></article>
 <div class="callout"><b>Sabse important invariant</b><p>Non-empty CSLL mein last node ka <code>next</code> hamesha head ka reference rakhta hai. Isi ek link ki wajah se list circular banti hai. Agar woh link <code>None</code> ho gaya, woh CSLL nahi raha; normal SLL ban gaya.</p></div>
</section>

<section class="chapter searchable" id="csll-initial" data-title="4.6.1 · CSLL Initial Setup">${b(`4.6.1`,`INITIAL SETUP`,`CSLL Initial Setup`,`Node same hota hai; head se circular connection banana naya part hai.`)}
 <div class="codebox"><div><span>Node aur empty circular list</span><button>Copy</button></div><pre><code>class Node:
    def __init__(self, data):
        self.data = data
        self.next = None


class CircularLinkedList:
    def __init__(self):
        self.head = None</code></pre></div>
 <div class="two-grid"><article><h3>Empty list</h3><p><code>self.head = None</code> ka meaning: abhi koi first node hi nahi hai. Isliye circular link bhi nahi ho sakta. Empty list ko print/search/delete se pehle handle karna padta hai.</p></article><article><h3>One-node list</h3><p>Jab pehla node A add hota hai, wahi head bhi hai aur last node bhi. Circular rule complete karne ke liye <code>A.next = A</code>. Matlab A ka next reference khud A ko point karta hai.</p></article></div>
 <div class="linked-chain"><span><b>HEAD → A</b><i>next → HEAD</i></span></div>
 <div class="danger"><b>Singleton ko SLL ki tarah mat socho</b><p>SLL singleton mein <code>head.next = None</code>. CSLL singleton mein <code>head.next = head</code>. Ye difference insertion, deletion aur traversal sab mein important hai.</p></div>
</section>

<section class="chapter searchable" id="csll-insert-beginning" data-title="4.6.2 · CSLL Insertion At Beginning">${b(`4.6.2`,`INSERT BEGINNING`,`CSLL Insertion At Beginning`,`New first node banao aur last node ki return link ko new head par shift karo.`)}
 <div class="zero-title"><span>BEFORE</span><h2>10 se start hoti list mein 5 ko new head banana hai.</h2><p>Purana last node 30 abhi 10 ko point karta hai. Head ko 5 par shift karne se pehle 30 ka next bhi 5 par shift karna hoga; warna cycle purane 10 par hi close rahegi.</p></div>
 <div class="csll-step-flow">
  <article><span>STEP 1 · LAST NODE DHOONDO</span><p><code>current</code> head se move karta hai. Jab <code>current.next == self.head</code>, current last node par hai: 30.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>current → 30</b><i>next → HEAD</i></span></div></article>
  <article><span>STEP 2 · NEW NODE KO OLD HEAD SE JODO</span><p><code>new_node.next = self.head</code>. Ab 5 ke andar purane first node 10 ka reference aa gaya. 5 abhi head nahi bana hai, isliye old circle abhi bhi 30 → 10 par close ho raha hai.</p><div class="two-grid"><div class="linked-chain"><span><b>new node → 5</b><i>next → 10</i></span></div><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>current → 30</b><i>next → HEAD</i></span></div></div></article>
  <article><span>STEP 3 · CIRCLE CLOSE KARO, PHIR HEAD SHIFT KARO</span><p>Pehle <code>current.next = new_node</code>: 30 ka next ab 5 hai. Phir <code>self.head = new_node</code>: HEAD bhi 5 par aa gaya. Ab new circular list ready hai.</p><div class="linked-chain"><span><b>HEAD → 5</b><i>next → 10</i></span><em>→</em><span><b>10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>next → HEAD</i></span></div></article>
 </div>
 <div class="codebox"><div><span>Insert at beginning</span><button>Copy</button></div><pre><code>def insert_at_beginning(self, data):
    new_node = Node(data)

    if self.head is None:
        self.head = new_node
        new_node.next = self.head
        return

    current = self.head

    while current.next != self.head:
        current = current.next

    new_node.next = self.head
    current.next = new_node
    self.head = new_node</code></pre></div>
 <div class="two-grid"><article><h3>Empty case</h3><p>Naya node pehla aur last dono hai. <code>self.head = new_node</code> ke baad <code>new_node.next = self.head</code>, so node khud ko point karta hai.</p></article><article><h3>Non-empty case</h3><p><code>current</code> ko last node tak le jaate hain. Last identify hota hai jab <code>current.next == self.head</code>. Phir new node purane head ko point karta hai, last node new node ko point karta hai, aur head new node par shift hota hai.</p></article></div>
 <div class="callout"><b>Complexity ka reason</b><p>Is version mein tail stored nahi hai. Isliye last node dhoondne ke liye traversal hota hai: O(n). Actual links update sirf constant baar hote hain, lekin total operation O(n) hai.</p></div>
</section>

<section class="chapter searchable" id="csll-insert-end" data-title="4.6.3 · CSLL Insertion At End">${b(`4.6.3`,`INSERT END`,`CSLL Insertion At End`,`New node ko last aur head ke beech connect karo.`)}
 <div class="codebox"><div><span>Insert at end</span><button>Copy</button></div><pre><code>def insert_at_end(self, data):
    new_node = Node(data)

    if self.head is None:
        self.head = new_node
        new_node.next = self.head
        return

    current = self.head

    while current.next != self.head:
        current = current.next

    current.next = new_node
    new_node.next = self.head</code></pre></div>
 <div class="csll-step-flow">
  <article><span>STEP 1 · LAST NODE DHOONDO</span><p><code>current</code> 10 se move karta hai: 10, phir 20, phir 30. 30 ka next wapas head ko point karta hai, isliye 30 current last node hai.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>current → 30</b><i>next → HEAD</i></span></div></article>
  <article><span>STEP 2 · OLD LAST KO NEW NODE SE JODO</span><p><code>current.next = new_node</code>. Current 30 par hai, so ab 30 ka next 40 ho gaya. 40 ka next abhi <code>None</code> hai, kyunki node bante waqt uska next None tha. Ye temporary state hai—next step mein circle complete hoga.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>current → 30</b><i>next → new node 40</i></span><em>→</em><span><b>40</b><i>next → None</i></span></div></article>
  <article><span>STEP 3 · NEW LAST KO HEAD SE JODO</span><p><code>new_node.next = self.head</code>. New node 40 ka next ab first node 10 ko point karta hai. Isse 40 new last node hai aur circle phir complete ho gaya.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>next → HEAD</i></span></div></article>
 </div>
 <div class="danger"><b>Order kyun important hai?</b><p><code>new_node.next = self.head</code> pehle ya baad mein safely ho sakta hai, kyunki old head already available hai. Lekin final state mein do links zaroor hone chahiye: old last → new node aur new node → head. Ek bhi missing hua toh cycle toot jaayegi.</p></div>
</section>

<section class="chapter searchable" id="csll-insert-middle" data-title="4.6.4 · CSLL Insertion In Middle">${b(`4.6.4`,`INSERT MIDDLE`,`CSLL Insertion In Middle`,`Position ke previous node par rukkar new node ko beech mein jodo.`)}
 <div class="codebox"><div><span>Insert after position ka previous node</span><button>Copy</button></div><pre><code>def insert_at_position(self, position, data):
    new_node = Node(data)
    current = self.head

    for _ in range(position - 1):
        current = current.next

    new_node.next = current.next
    current.next = new_node</code></pre></div>
 <div class="csll-step-flow">
  <article><span>STEP 1 · POSITION KE PREVIOUS NODE PAR RUKO</span><p>Position 2 par 99 insert karna hai. New node ko position 2 par aana hai, jahan abhi 30 hai. Isliye <code>current</code> ko 30 par nahi, uske previous node 20 par rokna hai.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>current → 20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>next → HEAD</i></span></div></article>
  <article><span>STEP 2 · OLD SUCCESSOR KO NEW NODE MEIN SAVE KARO</span><p><code>new_node.next = current.next</code>. Current 20 par hai aur 20.next 30 ka reference rakhta hai. Wahi reference 99.next mein save hota hai. Is waqt <code>20.next</code> abhi bhi 30 hi hai—<code>20 → 99</code> wali link next step mein banegi.</p><div class="csll-reference-states"><div><b>NEW NODE · ABHI LIST SE SEPARATE HAI</b><p>99 ke paas 30 ka reference aa gaya: <code>99.next → 30</code>. Lekin head se 99 tak abhi koi path nahi, isliye 99 abhi main list ka reachable part nahi hai.</p><div class="linked-chain"><span><b>new node → 99</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>next → HEAD</i></span></div></div><div><b>ORIGINAL LIST · ABHI BILKUL UNCHANGED HAI</b><p>Head abhi 10 ko point kar raha hai. 10 → 20 → 30 path still same hai; 20 ke andar abhi 99 ka reference nahi dala gaya.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>current → 20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>next → HEAD</i></span></div></div></div><div class="note"><b>Step 2 ka exact answer:</b> Haan, 10 aur 20 ka reference abhi sirf original list ke liye hai: <code>10.next → 20</code> aur <code>20.next → 30</code>. New node 99 ne 30 ko point karna start kar diya hai, but 20 abhi 99 ko point nahi karta. Step 3 mein <code>current.next = new_node</code> se <code>20.next → 99</code> hoga.</div></article>
  <article><span>STEP 3 · PREVIOUS NODE KO NEW NODE SE JODO</span><p><code>current.next = new_node</code>. Ab 20 ka next, jo pehle 30 tha, 99 ho gaya. 99 already 30 ko point kar raha hai, so complete circle hai: 10 → 20 → 99 → 30 → 40 → HEAD.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 99</i></span><em>→</em><span><b>99</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>next → HEAD</i></span></div></article>
 </div>
 <div class="callout"><b>GATE rule</b><p>Rewiring do assignments O(1) hai. Lekin position tak pahunchne ke liye loop chal raha hai, so position-based insertion ka total worst case O(n) hai.</p></div>
</section>

<section class="chapter searchable" id="csll-search" data-title="4.6.5 · CSLL Searching">${b(`4.6.5`,`SEARCHING`,`CSLL Searching`,`Head par return hote hi search stop honi chahiye.`)}
 <div class="codebox"><div><span>Search a key</span><button>Copy</button></div><pre><code>def search(self, key):
    if self.head is None:
        return

    current = self.head
    position = 0

    while True:
        if current.data == key:
            print(f"Found element {current.data} at position {position}")
            return

        position += 1
        current = current.next

        if current == self.head:
            break

    print("Element not found")</code></pre></div>
 <div class="csll-step-flow">
  <article><span>STEP 1 · HEAD SE SEARCH START</span><p>Maan lo key 30 search karni hai. <code>current</code> pehle head, yani 10 par hai. 10 ko key 30 se compare karo. Match nahi hua aur 10.next head nahi hai, so current ko 20 par move karte hain.</p><div class="linked-chain"><span><b>current → HEAD → 10</b><i>compare: 10 ≠ 30</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>next → HEAD</i></span></div></article>
  <article><span>STEP 2 · HAR NODE KO EK BAAR CHECK KARO</span><p>Current 20 par aaya; 20 bhi key nahi hai. 20.next head nahi hai, isliye aage move karna safe hai. Ab current 30 par aayega aur match mil jaayega.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>current → 20</b><i>compare: 20 ≠ 30</i></span><em>→</em><span><b>30</b><i>next → HEAD</i></span></div></article>
  <article><span>STEP 3 · LAST NODE CHECK KARKE HEAD PAR RETURN</span><p>Agar key absent ho, current 30 par bhi <code>current.data == key</code> check karega. Uske baad <code>current = current.next</code> se current 30 se wapas head 10 par aayega. Ab <code>current == self.head</code> true hai, isliye break. Last node searchable raha aur head ko dobara check nahi kiya.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>checked, then next → HEAD</i></span></div></article>
 </div>
 <div class="two-grid"><article><h3>Why not <code>while current</code>?</h3><p>Non-empty CSLL mein current kabhi None nahi hoga: 10 → 20 → 30 → 10 repeat hota rahega. Isliye key absent ho toh loop infinite ho jaayega.</p></article><article><h3><code>current == self.head</code> kyun?</h3><p>Current node ka data check karne ke baad hi current ko agle node par move karte hain. Last node ke baad current phir head par aata hai. Head par return ka meaning: har node exactly ek baar check ho chuka hai, so ab break.</p></article></div>
</section>

<section class="chapter searchable" id="csll-delete-beginning" data-title="4.6.6 · CSLL Deletion At Beginning">${b(`4.6.6`,`DELETE BEGINNING`,`CSLL Deletion At Beginning`,`Head shift ke saath last node ki circular link bhi new head par shift karo.`)}
 <div class="codebox"><div><span>Delete first node</span><button>Copy</button></div><pre><code>def delete_at_beginning(self):
    if self.head is None:
        return

    if self.head.next == self.head:
        self.head = None
        return

    current = self.head

    while current.next != self.head:
        current = current.next

    current.next = self.head.next
    self.head = self.head.next</code></pre></div>
 <div class="csll-step-flow">
  <article><span>STEP 1 · LAST NODE DHOONDO</span><p>Head abhi 10 ko point karta hai. <code>current</code> 10 se 20 aur phir 30 tak move karta hai. 30 ka next head 10 hai, isliye 30 last node hai.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>current → 30</b><i>next → HEAD</i></span></div></article>
  <article><span>STEP 2 · LAST NODE KO SECOND NODE SE JODO</span><p><code>current.next = self.head.next</code>. Current 30 par hai aur <code>self.head.next</code> second node 20 ka reference rakhta hai. Isliye 30.next ab 20 ho gaya. Ab 20 → 30 → 20 ka chhota circular part ban gaya; old head 10 abhi temporary reference ke roop mein <code>self.head</code> mein hai.</p><div class="csll-reference-states"><div><b>OLD HEAD · ABHI SELF.HEAD 10 KO POINT KAR RAHA HAI</b><div class="linked-chain"><span><b>old HEAD → 10</b><i>next → 20</i></span></div></div><div><b>NEW CIRCLE · 20 SE START HONE WALA PART READY HAI</b><div class="linked-chain"><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>current → 30</b><i>next → 20</i></span></div></div></div></article>
  <article><span>STEP 3 · HEAD KO SECOND NODE PAR SHIFT KARO</span><p><code>self.head = self.head.next</code>. Old head 10 ka next already 20 tha, so HEAD ab 20 par aa gaya. Ab main list ka entry point 20 hai aur cycle 20 → 30 → HEAD complete hai. Old 10 head se reachable nahi raha, isliye list se delete ho gaya.</p><div class="linked-chain"><span><b>HEAD → 20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>next → HEAD</i></span></div></article>
 </div>
 <div class="danger"><b>Singleton special case</b><p>Agar <code>head.next == head</code>, sirf ek node hai. Us node ko delete karne ka result empty list hai: <code>head = None</code>. <code>head = head.next</code> karoge toh node phir khud par hi rahega—delete nahi hoga.</p></div>
</section>

<section class="chapter searchable" id="csll-delete-end" data-title="4.6.7 · CSLL Deletion At End">${b(`4.6.7`,`DELETE END`,`CSLL Deletion At End`,`Second-last node ko new last banao aur uska next head par reconnect karo.`)}
 <div class="codebox"><div><span>Delete last node</span><button>Copy</button></div><pre><code>def delete_last(self):
    if self.head is None:
        return

    if self.head.next == self.head:
        self.head = None
        return

    previous_node = self.head
    current_node = self.head.next

    while current_node.next != self.head:
        previous_node = current_node
        current_node = current_node.next

    previous_node.next = self.head</code></pre></div>
 <div class="csll-step-flow">
  <article><span>STEP 1 · LAST AUR SECOND-LAST NODE LOCATE KARO</span><p>Traversal mein do references saath move karte hain. <code>current_node</code> last node 30 par rukta hai; <code>previous_node</code> ek step peechhe 20 par rehta hai. Condition <code>current_node.next == self.head</code> bolti hai ki current_node last node hai.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>previous_node → 20</b><i>next → 30</i></span><em>→</em><span><b>current_node → 30</b><i>next → HEAD</i></span></div></article>
  <article><span>STEP 2 · SECOND-LAST KO HEAD SE CONNECT KARO</span><p><code>previous_node.next = self.head</code>. Previous node 20 par hai aur head 10 ko point karta hai. Isliye 20.next, jo pehle 30 tha, ab direct 10 ho jaata hai. New circular list 10 → 20 → HEAD ban gayi.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>previous_node → 20</b><i>next → HEAD</i></span></div></article>
  <article><span>STEP 3 · OLD LAST NODE BYPASS HO GAYA</span><p>Old last node 30 ka reference ab 20.next mein nahi hai. Head se 10 → 20 → 10 follow karoge, 30 kabhi nahi milega. Isliye 30 logical circular list ka part nahi raha. Function finish hote hi local <code>current_node</code> bhi khatam; Python garbage collector is unreachable node ko later reclaim kar sakta hai.</p><div class="csll-reference-states"><div><b>FINAL LIST · HEAD SE REACHABLE</b><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → HEAD</i></span></div></div><div><b>OLD NODE 30 · LIST SE REMOVED</b><p>30 apne <code>next → HEAD</code> reference ko temporarily hold kar sakta hai, but HEAD se 30 tak koi incoming path nahi bacha. Isliye woh list se remove hai.</p><div class="linked-chain"><span><b>old current_node → 30</b><i>next → HEAD</i></span></div></div></div></article>
 </div>
</section>

<section class="chapter searchable" id="csll-delete-middle" data-title="4.6.8 · CSLL Deletion In Middle">${b(`4.6.8`,`DELETE MIDDLE`,`CSLL Deletion In Middle`,`Previous node ka next target ke successor par le jao.`)}
 <div class="codebox"><div><span>Delete a middle position</span><button>Copy</button></div><pre><code>def delete_from_middle(self, position):
    previous_node = self.head
    current_node = self.head.next

    for _ in range(position - 1):
        previous_node = current_node
        current_node = current_node.next

    previous_node.next = current_node.next</code></pre></div>
 <div class="csll-step-flow">
  <article><span>EXAMPLE · POSITION 2 PAR NODE 30 DELETE KARNA HAI</span><p>List hai 10 → 20 → 30 → 40 → HEAD. Position 2 par target node 30 hai. Humein 20 ko directly 40 se connect karna hai, taaki 30 cycle se bypass ho jaaye.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>target → 30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>next → HEAD</i></span></div></article>
  <article><span>STEP 1 · PREVIOUS AUR TARGET KO POSITION TAK LE JAO</span><p>Start mein <code>previous_node</code> 10 par aur <code>current_node</code> 20 par hota hai. Position 2 ke liye loop ek baar chalega: previous 20 par aur current 30 par aa jaayega. Ab previous target ke just pehle hai; current target node hai.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>previous_node → 20</b><i>next → 30</i></span><em>→</em><span><b>current_node → 30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>next → HEAD</i></span></div></article>
  <article><span>STEP 2 · TARGET KE SUCCESSOR KO PREVIOUS SE CONNECT KARO</span><p><code>previous_node.next = current_node.next</code>. Current node 30 ka next 40 ka reference rakhta hai. Wahi reference direct 20.next mein daal dete hain. Isliye 20.next, jo pehle 30 tha, ab 40 ho jaata hai.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>previous_node → 20</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>next → HEAD</i></span></div></article>
  <article><span>STEP 3 · 30 AB LIST MEIN REACHABLE NAHI HAI</span><p>Head se ab path sirf 10 → 20 → 40 → 10 hai. 30 ka incoming reference 20 se hata diya gaya, isliye HEAD se links follow karke 30 tak nahi pahunch sakte. Yehi deletion ka meaning hai: data erase karna nahi, target ko logical list se bypass karna.</p><div class="csll-reference-states"><div><b>FINAL CIRCULAR LIST · HEAD SE REACHABLE</b><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>next → HEAD</i></span></div></div><div><b>OLD TARGET 30 · LIST SE REMOVED</b><p>Local <code>current_node</code> temporarily 30 ka reference hold kar raha hai, but main list ke kisi node ka next ab 30 ko point nahi karta.</p><div class="linked-chain"><span><b>old current_node → 30</b><i>next → 40</i></span></div></div></div></article>
 </div>
 <div class="callout"><b>Yahan circular part kya change karta hai?</b><p>Middle deletion ka rewiring normal SLL jaisa hi hai. Difference traversal boundaries mein hai: valid positions ka dhyan rakho, kyunki <code>current_node</code> kabhi None nahi banega; galat/too-large position repeat cycle mein ghuma sakti hai.</p></div>
</section>

<section class="chapter searchable" id="csll-complexity" data-title="4.6.9 · CSLL Complexity Analysis">${b(`4.6.9`,`COMPLEXITY`,`CSLL Complexity Analysis`,`Locate cost + link update cost alag-alag socho.`)}
 <div class="table-wrap"><table><thead><tr><th>Operation</th><th>Lecture implementation</th><th>Why?</th></tr></thead><tbody><tr><td>Traversal / display</td><td>O(n)</td><td>Every node once; return to head stop.</td></tr><tr><td>Search</td><td>O(n)</td><td>Absent / last key mein all nodes check.</td></tr><tr><td>Insert beginning</td><td>O(n)</td><td>Last node locate for its next update.</td></tr><tr><td>Insert end</td><td>O(n)</td><td>Last node locate.</td></tr><tr><td>Insert middle</td><td>O(n)</td><td>Position locate O(n), rewire O(1).</td></tr><tr><td>Delete beginning</td><td>O(n)</td><td>Last node locate to reconnect cycle.</td></tr><tr><td>Delete end / middle</td><td>O(n)</td><td>Previous/current locate.</td></tr><tr><td>Total storage for n nodes</td><td>O(n)</td><td>Every node stores data + one next reference.</td></tr></tbody></table></div>
 <div class="callout"><b>Tail pointer optimisation</b><p>Agar class mein <code>tail</code> bhi maintain karo, tail ke paas already last node ka reference hoga. CSLL mein beginning/end insertion O(1) ho sakte hain. But question ka implementation sirf head use kare, toh tail assume mat karna—answer O(n) hi hoga.</p></div>
 <div class="danger"><b>Final GATE checklist</b><p>CSLL dekhte hi teen checks: (1) last.next = head, (2) empty aur singleton separate, (3) traversal stop at head—never wait for None. Complexity mein node locate karne ki cost zaroor add karo.</p></div>
</section>`,w=document.querySelector(`#csll`);w&&(w.insertAdjacentHTML(`beforebegin`,C),w.remove());var T=`
<section class="chapter searchable" id="dll-intro" data-title="4.7 · Doubly Linked List">${b(`4.7`,`DLL`,`Doubly Linked List`,`Har node ke paas agle node ka bhi aur previous node ka bhi reference hota hai.`)}
 <div class="zero-title"><span>CORE IDEA</span><h2>DLL mein har middle node ke do neighbours hote hain: ek left aur ek right.</h2><p>SLL mein sirf <code>next</code> tha. DLL mein <code>prev</code> bhi hota hai. Isliye forward aur backward dono direction mein travel kar sakte ho—but har change mein dono sides ke links correct rakhne padte hain.</p></div>
 <div class="linked-chain"><span><b>HEAD → 10</b><i>prev=None · next → 20</i></span><em>⇄</em><span><b>20</b><i>prev ← 10 · next → 30</i></span><em>⇄</em><span><b>30</b><i>prev ← 20 · next=None</i></span></div>
 <div class="callout"><b>DLL invariant</b><p>First node ka <code>prev = None</code>. Last node ka <code>next = None</code>. Beech ke har neighbour pair ke liye: agar A.next B hai, toh B.prev A hona hi chahiye.</p></div>
</section>

<section class="chapter searchable" id="dll-initial" data-title="4.7.1 · DLL Initial Setup">${b(`4.7.1`,`INITIAL SETUP`,`DLL Initial Setup`,`Node ke andar data, previous reference aur next reference store hote hain.`)}
 <div class="codebox"><div><span>Node + empty DLL</span><button>Copy</button></div><pre><code>class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None</code></pre></div>
 <div class="two-grid"><article><h3>Empty list</h3><p><code>head = None</code> means koi node nahi hai. Agar tail-based methods use karoge, empty list mein <code>tail = None</code> bhi hoga. Is state mein <code>head.prev</code> ya <code>head.next</code> access nahi kar sakte, because head itself None hai.</p></article><article><h3>One node</h3><p>Ek node 10 ho toh HEAD → 10. Is node ke dono outside neighbours nahi hain: <code>10.prev = None</code> aur <code>10.next = None</code>. Tail maintain kar rahe ho toh <code>head</code> aur <code>tail</code> dono isi 10 node ko point karenge.</p></article></div>
 <div class="danger"><b>DLL ka extra responsibility</b><p>SLL mein ek link correct karna enough ho sakta tha. DLL mein forward link aur backward link dono audit karo. Ek side update karne se list half-broken ho sakti hai.</p></div>
</section>

<section class="chapter searchable" id="dll-insert-beginning" data-title="4.7.2 · DLL Insertion At Beginning">${b(`4.7.2`,`INSERT BEGINNING`,`DLL Insertion At Beginning`,`New node ko old head se pehle jodo, aur old head ka prev bhi update karo.`)}
 <div class="codebox"><div><span>Insert at beginning</span><button>Copy</button></div><pre><code>def insert_at_beginning(self, data):
    new_node = Node(data)

    if self.head is None:
        self.head = new_node
        return

    new_node.next = self.head
    self.head.prev = new_node
    self.head = new_node</code></pre></div>
 <div class="csll-step-flow"><article><span>STEP 1 · NEW NODE KO OLD HEAD SE JODO</span><p><code>new_node.next = self.head</code>. New node 5 ka next purane first node 10 ko point karega.</p><div class="linked-chain"><span><b>new node → 5</b><i>prev=None · next → 10</i></span><em>⇄</em><span><b>old HEAD → 10</b><i>prev=None · next → 20</i></span></div></article><article><span>STEP 2 · OLD HEAD KA BACKWARD LINK UPDATE KARO</span><p><code>self.head.prev = new_node</code>. Ab 10.prev bhi 5 ko point karta hai. Forward aur backward dono direction connect ho gayi.</p><div class="linked-chain"><span><b>5</b><i>prev=None · next → 10</i></span><em>⇄</em><span><b>old HEAD → 10</b><i>prev ← 5 · next → 20</i></span></div></article><article><span>STEP 3 · HEAD SHIFT KARO</span><p><code>self.head = new_node</code>. Ab 5 new first node hai.</p><div class="linked-chain"><span><b>HEAD → 5</b><i>prev=None · next → 10</i></span><em>⇄</em><span><b>10</b><i>prev ← 5 · next → 20</i></span><em>⇄</em><span><b>20</b><i>prev ← 10 · next=None</i></span></div></article></div>
</section>

<section class="chapter searchable" id="dll-insert-end" data-title="4.7.3 · DLL Insertion At End">${b(`4.7.3`,`INSERT END`,`DLL Insertion At End`,`Tail ho toh direct insert; tail na ho toh last node locate karke insert karo.`)}
 <div class="zero-title"><span>TWO IMPLEMENTATIONS</span><h2><code>tail</code> stored hai ya nahi—complexity isi se change hoti hai.</h2><p>Dono methods correct hain. Difference sirf itna hai ki tail wale version mein last node ka reference already saved hota hai; without-tail version mein pehle last node dhoondhna padta hai.</p></div>
 <div class="codebox"><div><span>With tail · O(1)</span><button>Copy</button></div><pre><code>def insert_at_end_with_tail(self, data):
    new_node = Node(data)

    if self.head is None:
        self.head = new_node
        self.tail = new_node
        return

    self.tail.next = new_node
    new_node.prev = self.tail
    self.tail = new_node</code></pre></div>
 <div class="callout"><b><code>tail</code> version ko line-by-line samjho</b><p>Empty list mein first node hi head aur tail dono banta hai. Non-empty list mein <code>self.tail</code> old last node ko directly point kar raha hai: <code>self.tail.next = new_node</code> forward link banata hai; <code>new_node.prev = self.tail</code> backward link banata hai; phir <code>self.tail = new_node</code> tail reference ko naye last node par shift karta hai. Koi traversal nahi, isliye O(1).</p></div>
 <div class="codebox"><div><span>Without tail · O(n)</span><button>Copy</button></div><pre><code>def insert_at_end_without_tail(self, data):
    new_node = Node(data)

    if self.head is None:
        self.head = new_node
        return

    current = self.head

    while current.next:
        current = current.next

    current.next = new_node
    new_node.prev = current</code></pre></div>
 <div class="callout"><b>Without <code>tail</code> kyun O(n)?</b><p><code>current</code> head se ek-ek <code>next</code> follow karta hai. Last node milne tak worst case n nodes visit honge. Uske baad actual linking ki sirf do lines O(1) hain, but locate karne ki O(n) cost total complexity decide karti hai.</p></div>
 <div class="csll-step-flow"><article><span>STEP 1 · LAST NODE LOCATE KARO</span><p><code>current</code> head se next follow karta hai. Jis node ka <code>next = None</code>, wahi last node hai. Example mein current 30 par rukega.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>prev=None · next → 20</i></span><em>⇄</em><span><b>20</b><i>prev ← 10 · next → 30</i></span><em>⇄</em><span><b>current → 30</b><i>prev ← 20 · next=None</i></span></div></article><article><span>STEP 2 · DONO DIRECTION KE LINKS BANAO</span><p><code>current.next = new_node</code> se 30 → 40. <code>new_node.prev = current</code> se 40 ← 30. New node ka next None hi rahega, because woh new last node hai.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>prev=None · next → 20</i></span><em>⇄</em><span><b>20</b><i>prev ← 10 · next → 30</i></span><em>⇄</em><span><b>30</b><i>prev ← 20 · next → 40</i></span><em>⇄</em><span><b>40</b><i>prev ← 30 · next=None</i></span></div></article></div>
</section>

<section class="chapter searchable" id="dll-insert-middle" data-title="4.7.4 · DLL Insertion In Middle">${b(`4.7.4`,`INSERT MIDDLE`,`DLL Insertion In Middle`,`New node ko do existing neighbours ke beech forward aur backward dono side se connect karo.`)}
 <div class="codebox"><div><span>Insert at a middle position</span><button>Copy</button></div><pre><code>def insert_at_position(self, position, data):
    new_node = Node(data)
    current = self.head

    for _ in range(position - 1):
        current = current.next

    new_node.next = current.next
    new_node.prev = current
    current.next.prev = new_node
    current.next = new_node</code></pre></div>
 <div class="csll-step-flow"><article><span>EXAMPLE · 20 AUR 30 KE BEECH 99</span><p>Current 20 par hai. 20 right neighbour 30 ko point karta hai. New node 99 ko dono neighbours 20 aur 30 ke saath connect karna hai.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>⇄</em><span><b>current → 20</b><i>prev ← 10 · next → 30</i></span><em>⇄</em><span><b>30</b><i>prev ← 20 · next=None</i></span></div></article><article><span>STEP 1 · 99 MEIN DONO NEIGHBOURS SAVE KARO</span><p><code>new_node.next = current.next</code> se 99.next 30. <code>new_node.prev = current</code> se 99.prev 20. Ab 99 ke paas dono addresses hain, but 20 aur 30 abhi old relation mein hain.</p><div class="linked-chain"><span><b>20</b><i>next → 30</i></span><em>⇄</em><span><b>new node → 99</b><i>prev ← 20 · next → 30</i></span><em>⇄</em><span><b>30</b><i>prev ← 20 · next=None</i></span></div></article><article><span>STEP 2 · EXISTING NEIGHBOURS KO 99 SE REWIRE KARO</span><p><code>current.next.prev = new_node</code> se 30.prev 99 hota hai. Finally <code>current.next = new_node</code> se 20.next 99 hota hai. Dono directions complete.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>⇄</em><span><b>20</b><i>prev ← 10 · next → 99</i></span><em>⇄</em><span><b>99</b><i>prev ← 20 · next → 30</i></span><em>⇄</em><span><b>30</b><i>prev ← 99 · next=None</i></span></div></article></div>
</section>

<section class="chapter searchable" id="dll-search" data-title="4.7.5 · DLL Searching">${b(`4.7.5`,`SEARCHING`,`DLL Searching`,`Search forward direction mein head se next links follow karke hoti hai.`)}
 <div class="codebox"><div><span>Search a key</span><button>Copy</button></div><pre><code>def search(self, key):
    current = self.head
    position = 0

    while current:
        if current.data == key:
            print(f'{key} found at position {position}')
            return

        current = current.next
        position += 1</code></pre></div>
 <div class="two-grid"><article><h3>Forward search</h3><p>Standard search head se 10, 20, 30 ki direction mein next follow karegi. Key first node par mile toh O(1); absent ya last par mile toh O(n).</p></article><article><h3>Backward possible, automatically faster nahi</h3><p>DLL mein prev hai, so agar tail ka reference available ho toh tail se backward search start kar sakte ho. Lekin unsorted list mein worst case phir bhi O(n) hai.</p></article></div>
</section>

<section class="chapter searchable" id="dll-delete-beginning" data-title="4.7.6 · DLL Deletion At Beginning">${b(`4.7.6`,`DELETE BEGINNING`,`DLL Deletion At Beginning`,`Head ko second node par shift karo aur new head ka prev None karo.`)}
 <div class="codebox"><div><span>Delete first node</span><button>Copy</button></div><pre><code>def delete_first(self):
    if self.head is None:
        return

    if self.head.next is None:
        self.head = None
        return

    self.head = self.head.next
    self.head.prev = None</code></pre></div>
 <div class="csll-step-flow"><article><span>STEP 1 · HEAD KO SECOND NODE PAR SHIFT KARO</span><p>Old HEAD 10 ka next 20 hai. <code>self.head = self.head.next</code> se HEAD 20 par aa jaata hai.</p><div class="linked-chain"><span><b>old 10</b><i>next → HEAD (20)</i></span><em>⇄</em><span><b>HEAD → 20</b><i>prev ← 10 · next → 30</i></span></div></article><article><span>STEP 2 · NEW HEAD KA PREV CLEAN KARO</span><p><code>self.head.prev = None</code>. 20 ab first node hai, isliye uske left mein koi node nahi hona chahiye. Old 10 HEAD se unreachable ho jaata hai.</p><div class="linked-chain"><span><b>HEAD → 20</b><i>prev=None · next → 30</i></span><em>⇄</em><span><b>30</b><i>prev ← 20 · next=None</i></span></div></article></div>
</section>

<section class="chapter searchable" id="dll-delete-end" data-title="4.7.7 · DLL Deletion At End">${b(`4.7.7`,`DELETE END`,`DLL Deletion At End`,`Last node par pahunchkar uske prev ko new last banao.`)}
 <div class="codebox"><div><span>Delete last node</span><button>Copy</button></div><pre><code>def delete_last(self):
    if self.head is None:
        return

    if self.head.next is None:
        self.head = None
        return

    current = self.head

    while current.next:
        current = current.next

    current.prev.next = None</code></pre></div>
 <div class="csll-step-flow"><article><span>STEP 1 · LAST NODE LOCATE KARO</span><p>Current 30 par rukta hai because 30.next None hai. Current.prev 20 ka reference rakhta hai.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>⇄</em><span><b>20</b><i>prev ← 10 · next → 30</i></span><em>⇄</em><span><b>current → 30</b><i>prev ← 20 · next=None</i></span></div></article><article><span>STEP 2 · PREVIOUS NODE KO NEW LAST BANAO</span><p><code>current.prev.next = None</code>. Current.prev 20 hai, so 20.next None ho jaata hai. Ab 20 new last node hai aur 30 head se unreachable.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>prev=None · next → 20</i></span><em>⇄</em><span><b>20</b><i>prev ← 10 · next=None</i></span></div></article></div>
</section>

<section class="chapter searchable" id="dll-delete-middle" data-title="4.7.8 · DLL Deletion In Middle">${b(`4.7.8`,`DELETE MIDDLE`,`DLL Deletion In Middle`,`Target ke left aur right neighbour ko directly connect karo.`)}
 <div class="codebox"><div><span>Delete a middle position</span><button>Copy</button></div><pre><code>def delete_in_middle(self, position):
    current = self.head

    for _ in range(position - 1):
        current = current.next

    current.next.next.prev = current
    current.next = current.next.next</code></pre></div>
 <div class="csll-step-flow"><article><span>EXAMPLE · 20 KO DELETE KARNA HAI</span><p>List hai 10 ⇄ 20 ⇄ 30. Is code mein <code>current</code> delete hone wale node par nahi, uske ek node pehle rukta hai: current 10 par hoga aur <code>current.next</code> target 20 hoga.</p><div class="linked-chain"><span><b>current → 10</b><i>prev=None · next → 20</i></span><em>⇄</em><span><b>target → 20</b><i>prev ← 10 · next → 30</i></span><em>⇄</em><span><b>30</b><i>prev ← 20 · next=None</i></span></div></article><article><span>STEP 1 · TARGET KE RIGHT NODE KA PREV UPDATE KARO</span><p><code>current.next.next.prev = current</code>. Current 10 par hai; <code>current.next</code> 20 hai; <code>current.next.next</code> 30 hai. So 30.prev, jo pehle 20 tha, ab 10 ho jaata hai. Backward link correct ho gaya.</p><div class="linked-chain"><span><b>current → 10</b><i>prev=None · next → 20</i></span><em>⇄</em><span><b>target → 20</b><i>prev ← 10 · next → 30</i></span><em>⇄</em><span><b>30</b><i>prev ← 10 · next=None</i></span></div></article><article><span>STEP 2 · CURRENT KA NEXT TARGET KE BAAD WALE NODE PAR SHIFT KARO</span><p><code>current.next = current.next.next</code>. 10.next, jo 20 ko point kar raha tha, ab direct 30 ko point karega. Ab 20 ke paas left se koi incoming next link nahi bacha; HEAD se woh reachable nahi hai. List 10 ⇄ 30 ban gayi.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>prev=None · next → 30</i></span><em>⇄</em><span><b>30</b><i>prev ← 10 · next=None</i></span></div></article></div>
</section>

<section class="chapter searchable" id="dll-complexity" data-title="4.7.9 · DLL Complexity Analysis">${b(`4.7.9`,`COMPLEXITY`,`DLL Complexity Analysis`,`DLL ka benefit backward link hai; position locate karne ka cost phir bhi count karo.`)}
 <div class="table-wrap"><table><thead><tr><th>Operation</th><th>Only head stored</th><th>Why?</th></tr></thead><tbody><tr><td>Traverse / search</td><td>O(n)</td><td>Worst case all nodes check.</td></tr><tr><td>Insert/delete beginning</td><td>O(1)</td><td>Fixed head and one neighbour updates.</td></tr><tr><td>Insert/delete end</td><td>O(n)</td><td>Last node locate from head.</td></tr><tr><td>Middle by position</td><td>O(n)</td><td>Locate O(n), DLL rewiring O(1).</td></tr><tr><td>Delete known middle node</td><td>O(1)</td><td>prev and next neighbours directly available.</td></tr><tr><td>Storage per node</td><td>O(1)</td><td>Data + prev + next references.</td></tr><tr><td>Total storage n nodes</td><td>O(n)</td><td>n constant-size node objects.</td></tr></tbody></table></div>
 <div class="callout"><b>Tail pointer ka effect</b><p>Agar <code>tail</code> bhi maintain karo, insert/delete at end O(1) ho sakte hain because tail.prev se previous node mil jaata hai. Sirf head wale lecture code mein tail assume mat karna; end operations O(n) hain.</p></div>
 <div class="danger"><b>Final DLL audit</b><p>Har operation ke baad check: new head.prev None? new tail.next None? Aur middle neighbour pair ke liye <code>A.next.prev == A</code> and <code>B.prev.next == B</code>? Forward chain correct dikhna enough nahi hai.</p></div>
</section>`,E=document.querySelector(`#dll`);E&&(E.insertAdjacentHTML(`beforebegin`,T),E.remove());var D=`
<section class="chapter searchable" id="cdll-intro" data-title="4.8 · Circular Doubly Linked List">${b(`4.8`,`CDLL`,`Circular Doubly Linked List`,`CDLL mein har node ke prev aur next links hote hain, aur list dono directions mein circular hoti hai.`)}
 <div class="zero-title"><span>CORE IDEA</span><h2>CDLL mein koi <code>None</code> boundary nahi hoti.</h2><p>Last node ka <code>next</code> wapas HEAD ko point karta hai, aur first node ka <code>prev</code> TAIL ko. Isliye forward aur backward dono direction mein ghoom sakte ho. Traversal ko <code>None</code> par nahi, starting node par wapas aane par stop karna hota hai.</p></div>
 <div class="linked-chain"><span><b>HEAD → 10</b><i>prev ← 40 · next → 20</i></span><em>⇄</em><span><b>20</b><i>prev ← 10 · next → 30</i></span><em>⇄</em><span><b>30</b><i>prev ← 20 · next → 40</i></span><em>⇄</em><span><b>TAIL → 40</b><i>prev ← 30 · next → HEAD</i></span></div>
 <div class="callout"><b>Do boundary links yaad rakho</b><p><code>head.prev = tail</code> aur <code>tail.next = head</code>. Har middle pair ke liye <code>A.next.prev == A</code> aur <code>B.prev.next == B</code>.</p></div>
</section>

<section class="chapter searchable" id="cdll-initial" data-title="4.8.1 · CDLL Initial Setup">${b(`4.8.1`,`INITIAL SETUP`,`CDLL Initial Setup`,`Empty aur singleton CDLL ki circular links ko samjho.`)}
 <div class="codebox"><div><span>Node + empty CDLL</span><button>Copy</button></div><pre><code>class Node:
    def __init__(self, data):
        self.data = data
        self.prev = None
        self.next = None


class CircularDoublyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None</code></pre></div>
 <div class="two-grid"><article><h3>Empty</h3><p><code>head = None</code> aur <code>tail = None</code> means list mein koi node nahi. Isliye circular links check karne se pehle empty state handle karo.</p></article><article><h3>Singleton</h3><p>Ek node 10 ho toh <code>head.prev = head</code>, <code>head.next = head</code> aur <code>tail = head</code>. Node khud hi first aur last dono hai.</p></article></div>
</section>

<section class="chapter searchable" id="cdll-insert-beginning" data-title="4.8.2 · CDLL Insertion At Beginning">${b(`4.8.2`,`INSERT BEGINNING`,`CDLL Insertion At Beginning`,`New node ko head se pehle aur old tail ke baad connect karo.`)}
 <div class="codebox"><div><span>Insert at beginning</span><button>Copy</button></div><pre><code>def insert_at_beginning(self, data):
    new_node = Node(data)

    if self.head is None:
        self.head = new_node
        self.tail = new_node
        new_node.next = new_node
        new_node.prev = new_node
        return

    new_node.next = self.head
    new_node.prev = self.tail
    self.tail.next = new_node
    self.head.prev = new_node
    self.head = new_node</code></pre></div>
 <div class="csll-step-flow"><article><span>STEP 1 · OLD TAIL AUR HEAD SAVE KARO</span><p>CDLL mein <code>self.tail</code> old last node ka reference rakhta hai. HEAD 10 aur TAIL 40 hai.</p><div class="linked-chain"><span><b>TAIL → 40</b><i>prev ← 30 · next → HEAD (10)</i></span><em>⇄</em><span><b>HEAD → 10</b><i>prev ← 40 · next → 20</i></span></div></article><article><span>STEP 2 · NEW NODE KE DONO LINKS SET KARO</span><p><code>new_node.next = self.head</code> se 5 → 10 aur <code>new_node.prev = self.tail</code> se 5 ← 40. Ab 5 old tail aur old head ke beech ready hai.</p><div class="linked-chain"><span><b>40</b><i>next → 10</i></span><em>⇄</em><span><b>new node → 5</b><i>prev ← 40 · next → 10</i></span><em>⇄</em><span><b>10</b><i>prev ← 40</i></span></div></article><article><span>STEP 3 · DONO NEIGHBOURS REWIRE, PHIR HEAD SHIFT</span><p><code>self.tail.next = new_node</code> aur <code>self.head.prev = new_node</code> ke baad <code>self.head = new_node</code>. Tail 40 hi rehta hai; sirf HEAD 5 par shift hota hai.</p><div class="linked-chain"><span><b>HEAD → 5</b><i>prev ← 40 · next → 10</i></span><em>⇄</em><span><b>10</b><i>prev ← 5 · next → 20</i></span><em>⇄</em><span><b>TAIL → 40</b><i>prev ← 30 · next → HEAD</i></span></div></article></div>
</section>

<section class="chapter searchable" id="cdll-insert-end" data-title="4.8.3 · CDLL Insertion At End">${b(`4.8.3`,`INSERT END`,`CDLL Insertion At End`,`Head ke prev, yani old tail, ke baad new node jodo.`)}
 <div class="codebox"><div><span>Insert at end</span><button>Copy</button></div><pre><code>def insert_at_end(self, data):
    new_node = Node(data)

    if self.head is None:
        self.head = new_node
        new_node.next = new_node
        new_node.prev = new_node
        self.tail = new_node
        return

    new_node.prev = self.tail
    new_node.next = self.head
    self.tail.next = new_node
    self.head.prev = new_node
    self.tail = new_node</code></pre></div>
 <div class="callout"><b>Flow</b><p>Empty list mein new node head aur tail dono banta hai. Non-empty list mein <code>self.tail</code> old last node ko directly point karta hai. New node old tail aur head ke beech aata hai; final line <code>self.tail = new_node</code> tail reference ko new last node par shift karti hai. Isliye insertion O(1) hai.</p></div>
 <div class="linked-chain"><span><b>HEAD → 10</b><i>prev ← 40 · next → 20</i></span><em>⇄</em><span><b>40</b><i>prev ← 30 · next → new 50</i></span><em>⇄</em><span><b>new TAIL → 50</b><i>prev ← 40 · next → HEAD</i></span></div>
</section>

<section class="chapter searchable" id="cdll-insert-middle" data-title="4.8.4 · CDLL Insertion In Middle">${b(`4.8.4`,`INSERT MIDDLE`,`CDLL Insertion In Middle`,`Previous aur successor dono sides ke four links update karo.`)}
 <div class="codebox"><div><span>Insert at middle</span><button>Copy</button></div><pre><code>def insert_at_middle(self, data, postion):
    new_node = Node(data)

    if self.head is None:
        self.head = new_node
        new_node.next = new_node
        new_node.prev = new_node
        self.tail = new_node
        return

    current = self.head
    for _ in range(postion - 1):
        current = current.next

    new_node.next = current.next
    new_node.prev = current
    current.next.prev = new_node
    current.next = new_node</code></pre></div>
 <div class="csll-step-flow"><article><span>STEP 1 · POSITION TAK CURRENT LE JAO</span><p><code>current</code> ko HEAD se start karte hain. <code>range(postion - 1)</code> ke baad current us node par hota hai jiske baad insertion karni hai—example mein current 20 hai aur uska next 30.</p><div class="linked-chain"><span><b>current → 20</b><i>prev ← 10 · next → 30</i></span><em>⇄</em><span><b>30</b><i>prev ← 20 · next → 40</i></span></div></article><article><span>STEP 2 · NEW NODE KE DONO LINKS SET KARO</span><p><code>new_node.next = current.next</code> se 99 ka next 30 aur <code>new_node.prev = current</code> se 99 ka prev 20. Purani chain safe rehti hai.</p><div class="linked-chain"><span><b>20</b><i>next → 30</i></span><em>⇄</em><span><b>new 99</b><i>prev ← 20 · next → 30</i></span><em>⇄</em><span><b>30</b><i>prev ← 20</i></span></div></article><article><span>STEP 3 · EXISTING LINKS REWIRE KARO</span><p><code>current.next.prev = new_node</code> se 30.prev 99 aur <code>current.next = new_node</code> se 20.next 99. Final chain 20 ⇄ 99 ⇄ 30 hai.</p><div class="linked-chain"><span><b>20</b><i>prev ← 10 · next → 99</i></span><em>⇄</em><span><b>99</b><i>prev ← 20 · next → 30</i></span><em>⇄</em><span><b>30</b><i>prev ← 99 · next → 40</i></span></div></article></div>
</section>

<section class="chapter searchable" id="cdll-search" data-title="4.8.5 · CDLL Searching">${b(`4.8.5`,`SEARCHING`,`CDLL Searching`,`Head par wapas aate hi traversal stop karo.`)}
 <div class="codebox"><div><span>Search in CDLL</span><button>Copy</button></div><pre><code>def search(self, key):
    if self.head is None:
        return

    current = self.head
    position = 0

    while True:
        if current.data == key:
            print(f"Found element {current.data} at position {position}")
            return

        position += 1
        current = current.next

        if current == self.head:
            break

    print("Element not found")</code></pre></div>
 <div class="callout"><b>CDLL mein <code>while current</code> kyun use nahi karte?</b><p>SLL mein <code>while current</code> sahi hai, kyunki last node ke baad current <code>None</code> ho jaata hai. Lekin CDLL mein last node ka next wapas HEAD hota hai, isliye current kabhi None nahi hota aur loop infinite chal sakta hai. Correct stop condition hai: ek complete round ke baad <code>current == self.head</code>. Agar poora round complete ho gaya aur key nahi mili, toh loop ke baad <code>Element not found</code> print hota hai.</p></div>
</section>

<section class="chapter searchable" id="cdll-delete-beginning" data-title="4.8.6 · CDLL Deletion At Beginning">${b(`4.8.6`,`DELETE BEGINNING`,`CDLL Deletion At Beginning`,`Head shift karo aur old tail/new head ke circular links reconnect karo.`)}
 <div class="codebox"><div><span>Delete first node</span><button>Copy</button></div><pre><code>def delete_at_beginning(self):
    if self.head is None:
        return

    if self.head == self.tail:
        self.head = None
        self.tail = None
        return

    self.head.prev.next = self.head.next
    self.head.next.prev = self.head.prev
    self.head = self.head.next
    </code></pre></div>
 <div class="csll-step-flow"><article><span>STEP 1 · OLD TAIL AUR NEW HEAD IDENTIFY KARO</span><p>Old HEAD 10 delete hoga. <code>tail = head.prev</code> se 40 milta hai aur <code>head = head.next</code> se new head 20.</p><div class="linked-chain"><span><b>old HEAD → 10</b><i>prev ← 40 · next → 20</i></span><em>⇄</em><span><b>new HEAD → 20</b><i>prev ← 10 · next → 30</i></span><em>⇄</em><span><b>TAIL → 40</b><i>next → old HEAD</i></span></div></article><article><span>STEP 2 · CIRCLE NEW HEAD PAR CLOSE KARO</span><p><code>self.head.prev = tail</code> se 20.prev 40 aur <code>tail.next = self.head</code> se 40.next 20. Old 10 HEAD se unreachable ho jaata hai.</p><div class="linked-chain"><span><b>HEAD → 20</b><i>prev ← 40 · next → 30</i></span><em>⇄</em><span><b>40</b><i>prev ← 30 · next → HEAD</i></span></div></article></div>
</section>

<section class="chapter searchable" id="cdll-delete-end" data-title="4.8.7 · CDLL Deletion At End">${b(`4.8.7`,`DELETE END`,`CDLL Deletion At End`,`Head ke prev old tail hota hai; uske prev ko new tail banao.`)}
 <div class="codebox"><div><span>With tail · Delete last node</span><button>Copy</button></div><pre><code>def delete_at_end(self):
    if self.head is None:
        return

    if self.head == self.tail:
        self.head = None
        self.tail = None
        return

    self.tail = self.tail.prev
    self.tail.next = self.head
    self.head.prev = self.tail</code></pre></div>
 <div class="callout"><b>With tail: O(1)</b><p>Singleton check ke baad <code>self.tail = self.tail.prev</code> se previous node direct new tail ban jaata hai. Phir new tail ka next HEAD aur HEAD ka prev new tail set karte hain. Koi traversal nahi hota.</p></div>
 <div class="codebox"><div><span>Without tail · Delete last node</span><button>Copy</button></div><pre><code>def delete_at_end(self):
    if self.head is None:
        return

    if self.head.next == self.head:
        self.head = None
        self.tail = None
        return

    new_tail = self.head.prev.prev
    new_tail.next = self.head
    self.head.prev = new_tail
    self.tail = new_tail</code></pre></div>
 <div class="callout"><b>Without tail: still O(1) in CDLL</b><p><code>self.head.prev</code> old tail hai aur uska <code>prev</code> new tail. Isliye <code>self.head.prev.prev</code> se previous node direct mil jaata hai. CDLL ki circular backward link ki wajah se yahan traversal ki zaroorat nahi padti.</p></div>
</section>

<section class="chapter searchable" id="cdll-delete-middle" data-title="4.8.8 · CDLL Deletion In Middle">${b(`4.8.8`,`DELETE MIDDLE`,`CDLL Deletion In Middle`,`Target ke prev aur next neighbours ko direct connect karo.`)}
 <div class="codebox"><div><span>Delete node by key</span><button>Copy</button></div><pre><code>def delete_at_middle(self, key):
    if self.head is None:
        return

    if self.head == self.tail:
        if self.head.data == key:
            self.head = None
            self.tail = None
        return

    current = self.head

    while True:
        if current.data == key:
            current.prev.next = current.next
            current.next.prev = current.prev

            if current == self.head:
                self.head = current.next

            if current == self.tail:
                self.tail = current.prev

            return

        current = current.next

        if current == self.head:
            break

    print("Key not found")</code></pre></div>
 <div class="csll-step-flow"><article><span>STEP 1 · TARGET KE DONO NEIGHBOURS DEKHO</span><p>Target 30 hai. Uska left neighbour 20 (<code>current.prev</code>) aur right neighbour 40 (<code>current.next</code>) hai.</p><div class="linked-chain"><span><b>20</b><i>next → target 30</i></span><em>⇄</em><span><b>target → 30</b><i>prev ← 20 · next → 40</i></span><em>⇄</em><span><b>40</b><i>prev ← 30 · next → HEAD</i></span></div></article><article><span>STEP 2 · FORWARD BYPASS</span><p><code>current.prev.next = current.next</code>. 20.next ab 30 ke instead 40 ko point karega.</p><div class="linked-chain"><span><b>20</b><i>next → 40</i></span><em>⇄</em><span><b>target 30</b><i>still has old links</i></span><em>⇄</em><span><b>40</b><i>prev ← 30</i></span></div></article><article><span>STEP 3 · BACKWARD BYPASS</span><p><code>current.next.prev = current.prev</code>. 40.prev ab 20. Dono directions se target bypass ho gaya; 30 HEAD se unreachable hai.</p><div class="linked-chain"><span><b>HEAD → 20</b><i>prev ← 10 · next → 40</i></span><em>⇄</em><span><b>40</b><i>prev ← 20 · next → HEAD</i></span></div></article></div>
</section>

<section class="chapter searchable" id="cdll-complexity" data-title="4.8.9 · CDLL Complexity Analysis">${b(`4.8.9`,`COMPLEXITY`,`CDLL Complexity Analysis`,`Circular links position locate cost ko remove nahi karte; known node aur position alag analyse karo.`)}
 <div class="table-wrap"><table><thead><tr><th>Operation</th><th>Time</th><th>Reason</th></tr></thead><tbody><tr><td>Traversal/search</td><td>O(n)</td><td>At most one complete circle.</td></tr><tr><td>Insert beginning/end</td><td>O(1)</td><td>Head.prev se tail aur tail.prev se previous direct milte hain.</td></tr><tr><td>Insert by position</td><td>O(n)</td><td>Position tak move O(n), rewiring O(1).</td></tr><tr><td>Delete beginning/end</td><td>O(1)</td><td>Boundary neighbours circular links se available.</td></tr><tr><td>Delete known middle node</td><td>O(1)</td><td>Target ke prev/next already available.</td></tr><tr><td>Space per node</td><td>O(1)</td><td>Data + prev + next references.</td></tr><tr><td>Total space n nodes</td><td>O(n)</td><td>n node objects store hote hain.</td></tr></tbody></table></div>
 <div class="danger"><b>GATE trap</b><p>CDLL mein <code>current == None</code> kabhi termination nahi hoga. Search/traversal ko starting node par return hone par stop karo. Complexity mein “known node?” aur “position se locate?” alag likho.</p></div>
</section>`,O=document.querySelector(`#cdll`);O&&(O.insertAdjacentHTML(`beforebegin`,D),O.remove());var k=`
<section class="chapter searchable" id="coding-middle" data-title="4.9.1 · Find the Middle Element of a Linked List">${b(`4.9.1`,`MIDDLE ELEMENT`,`Find the Middle Element of a Linked List`,`Length-based two-pass aur slow-fast one-pass dono approaches samjho.`)}
 <div class="codebox"><div><span>Two-pass solution · O(n) time, O(1) space</span><button>Copy</button></div><pre><code>def find_middle(self):
    length = 0
    current = self.head

    while current:
        length += 1
        current = current.next

    middle_index = length // 2

    current = self.head

    for _ in range(middle_index):
        current = current.next

    return current</code></pre></div>
 <div class="callout"><b>Two-pass ka flow</b><p>Pehle poori list traverse karke length count hoti hai. Phir <code>length // 2</code> middle index deta hai. Current ko head par reset karke utne steps move karte hain. Even length mein ye second-middle node return karta hai.</p></div>
 <div class="codebox"><div><span>Single-pass slow-fast · O(n) time, O(1) space</span><button>Copy</button></div><pre><code>def find_middle(self):
    if self.head is None:
        return None

    slow = self.head
    fast = self.head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow</code></pre></div>
 <div class="csll-step-flow"><article><span>STEP 1 · DONO POINTER HEAD PAR</span><p><code>slow</code> aur <code>fast</code> dono first node se start hote hain.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>slow, fast</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>None</i></span></div></article><article><span>STEP 2 · SLOW 1, FAST 2 STEPS</span><p>Har iteration mein slow ek node aur fast do nodes move karta hai. Fast double speed se end tak pahunchta hai.</p><div class="linked-chain"><span><b>10</b><i>slow start</i></span><em>→</em><span><b>slow → 20</b><i>next → 30</i></span><em>→</em><span><b>fast → 30</b><i>next → 40</i></span></div></article><article><span>STEP 3 · FAST END PAR, SLOW MIDDLE PAR</span><p>Jab <code>fast</code> ya <code>fast.next</code> false hota hai, slow middle node par hota hai. 4 nodes mein second-middle 30 return hota hai.</p><div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>slow → 30</b><i>next → 40</i></span><em>→</em><span><b>fast → None</b><i>stop</i></span></div></article></div>
</section>

<section class="chapter searchable" id="coding-count" data-title="4.9.2 · Count Nodes in a Circular List">${b(`4.9.2`,`COUNT NODES`,`Count Nodes in a Circular List`,`Circular list mein None ka wait nahi; head par return count stop karta hai.`)}
 <div class="codebox"><div><span>Count CSLL/CDLL nodes</span><button>Copy</button></div><pre><code>def count_nodes(self):
    if self.head is None:
        return 0

    count = 0
    current = self.head

    while True:
        count += 1
        current = current.next

        if current == self.head:
            break

    return count</code></pre></div>
 <div class="callout"><b>Important</b><p>Circular list mein last node ka next HEAD hota hai, None nahi. Isliye har node ko exactly ek baar count karke jab current wapas HEAD par aaye tab break karo. Empty list ka count 0 hai.</p></div>
</section>

<section class="chapter searchable" id="coding-sum" data-title="4.9.3 · Sum of Nodes in a Linked List">${b(`4.9.3`,`SUM NODES`,`Sum of Nodes in a Linked List`,`Accumulator ko identity value 0 se start karke har node ka data add karo.`)}
 <div class="codebox"><div><span>Sum nodes</span><button>Copy</button></div><pre><code>def sum_nodes(self):
    total = 0
    current = self.head

    while current:
        total += current.data
        current = current.next

    return total</code></pre></div>
 <div class="two-grid"><article><h3>Step 1</h3><p><code>total = 0</code> additive identity hai. Empty list mein loop nahi chalega, isliye answer naturally 0 rahega.</p></article><article><h3>Step 2</h3><p>Current ke data ko total mein add karo, phir current ko next node par shift karo. Har node once visit hota hai: O(n) time, O(1) extra space.</p></article></div>
</section>

<section class="chapter searchable" id="coding-max-min" data-title="4.9.4 · Maximum and Minimum Element in a Linked List">${b(`4.9.4`,`MAXIMUM · MINIMUM`,`Maximum and Minimum Element in a Linked List`,`Max/min ko 0 se nahi, first node ke data se initialize karo.`)}
 <div class="codebox"><div><span>Maximum and minimum</span><button>Copy</button></div><pre><code>def find_max_min(self):
    if self.head is None:
        return None, None

    maximum = self.head.data
    minimum = self.head.data
    current = self.head.next

    while current:
        maximum = max(maximum, current.data)
        minimum = min(minimum, current.data)
        current = current.next

    return maximum, minimum</code></pre></div>
 <div class="callout"><b>0 se initialize kyun nahi?</b><p>Agar list ke saare values negative hain, toh max ko 0 se start karna galat answer dega. Isliye first node ka actual data starting benchmark banta hai; baaki nodes usse compare hote hain.</p></div>
</section>`,A=document.querySelector(`#coding`);A&&A.insertAdjacentHTML(`beforebegin`,k);var re=`
<section class="chapter searchable" id="gate-patterns-new" data-title="GATE Pointer Patterns">${b(`GATE`,`POINTER PATTERNS`,`GATE Pointer Patterns`,`Teen reusable patterns ko pointer ke exact addresses ke saath trace karo.`)}
 <div class="callout"><b>Pointer ka simple meaning</b><p>Variable node ke data ko copy nahi karta; woh node ka reference/address hold karta hai. Agar <code>slow</code> 20 ko reference kar raha hai, iska matlab slow se hum node 20 tak pahunch sakte hain. <code>slow.next</code> ka matlab: jis node ko slow point kar raha hai, uske next field mein stored agle node ka reference.</p></div>
 <section class="subsection"><h2>1 · FAST/SLOW POINTER</h2><h3>Kaunsa problem solve karta hai?</h3><p>Ek pass mein linked list ka middle node find karna aur cycle detect karna. Humein list ka length pehle se nahi pata hota, phir bhi do references se answer mil jaata hai.</p><h3>Basic intuition</h3><p><code>slow</code> har turn mein 1 node aage jaata hai. <code>fast</code> har turn mein 2 nodes aage jaata hai. Fast double speed se chalega, isliye woh list ke end tak pahunchte-pahunchte slow ko beech ke paas chhodta hai.</p><h3>Ye kaam kyun karta hai?</h3><p>Fast ne jitni distance cover ki, slow ne uska aadha cover kiya. Isliye fast end par ho toh slow roughly half distance par hota hai. Cycle mein end hota hi nahi; dono circular path par chalte hain aur fast, slow ko catch kar leta hai.</p>
  <div class="linked-chain"><span><b>HEAD → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>next → 50</i></span><em>→</em><span><b>50</b><i>next → None</i></span></div>
  <h3>BEFORE LOOP · variables kis node ko reference kar rahe hain?</h3><p><code>slow = self.head</code> means slow → 10. <code>fast = self.head</code> means fast → 10. Dono alag variable hain, par shuru mein same node ka reference hold karte hain.</p>
  <table class="trace-table"><thead><tr><th>Iteration</th><th>slow/current</th><th>fast</th><th>nxt</th><th>What changed</th></tr></thead><tbody><tr><td>Before</td><td>slow → 10</td><td>fast → 10</td><td>not used</td><td>Dono HEAD par.</td></tr><tr><td>1</td><td>slow → 20</td><td>fast → 30</td><td>not used</td><td>slow.next se 20; fast.next.next se 30.</td></tr><tr><td>2</td><td>slow → 30</td><td>fast → 50</td><td>not used</td><td>slow ek, fast do nodes move.</td></tr><tr><td>Stop</td><td>slow → 30</td><td>fast → None</td><td>not used</td><td>fast false, loop stop; answer 30.</td></tr></tbody></table>
  <div class="pointer-diagram"><div class="diagram-label head-label">SLOW ↓</div><div class="diagram-row"><span class="diagram-node"><b>10</b><i>next → 20</i></span><em>→</em><span class="diagram-node"><b>20</b><i>next → 30</i></span><em>→</em><span class="diagram-node"><b>30</b><i>next → 40</i></span><em>→</em><span class="diagram-node"><b>40</b><i>next → 50</i></span><em>→</em><span class="diagram-node"><b>50</b><i>next → None</i></span></div></div>
  <h3>Odd aur even length ka result</h3><p>Odd list <code>10 → 20 → 30 → 40 → 50</code> mein slow 30 par rukta hai: exact middle. Even list <code>10 → 20 → 30 → 40</code> mein is code ka slow 30 par rukta hai: <b>second middle</b>. First middle 20 chahiye toh loop condition/initialisation convention change karni padegi.</p>
  <h3><code>while fast and fast.next</code> ka meaning</h3><p><code>fast</code> check karta hai ki fast kisi real node ko reference kar raha hai. <code>fast.next</code> check karta hai ki fast ke baad 2-step jump ke liye agla node bhi available hai. Python short-circuit karta hai: agar pehla part false hai, doosra part evaluate nahi hota—so <code>fast.next</code> on None error nahi deta.</p>
  <div class="codebox"><div><span>Find middle</span><button>Copy</button></div><pre><code>def find_middle(self):
    slow = self.head
    fast = self.head

    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    return slow</code></pre></div>
  <h3>Code line-by-line</h3><p>Line 1–2: slow aur fast dono 10 ko reference. Loop check: fast 10 hai aur 10.next 20 hai, so enter. <code>slow = slow.next</code>: slow 20. <code>fast = fast.next.next</code>: fast 30. Agle round mein slow 30 aur fast 50. Next check mein fast 50 hai but <code>fast.next</code> None, so stop; slow 30 return.</p>
  <h3>Cycle detection example</h3><p>Cycle list: <code>10 → 20 → 30 → 40 → 50</code> aur <code>50.next → 30</code>. Yahan None nahi aayega. Har round slow 1 aur fast 2 steps chalte hain.</p><table class="trace-table"><thead><tr><th>Iteration</th><th>slow</th><th>fast</th><th>What changed</th></tr></thead><tbody><tr><td>Before</td><td>10</td><td>10</td><td>Both HEAD.</td></tr><tr><td>1</td><td>20</td><td>30</td><td>slow 1, fast 2.</td></tr><tr><td>2</td><td>30</td><td>50</td><td>Fast cycle ke entry ke paas.</td></tr><tr><td>3</td><td>40</td><td>40</td><td>Dono same node par; cycle detected.</td></tr></tbody></table><div class="linked-chain"><span><b>30</b><i>next → 40</i></span><em>→</em><span><b>40</b><i>next → 50</i></span><em>→</em><span><b>50</b><i>next → 30</i></span><em>↺</em></div>
  <p><b>Time:</b> O(n). <b>Auxiliary space:</b> O(1), kyunki sirf slow aur fast references use hue.</p><p><b>Edge cases:</b> empty list mein slow/fast None; one node mein slow wahi node; two nodes mein second node second-middle. Cycle check mein empty list ko pehle handle karo.</p><p><b>GATE traps:</b> fast ko ek hi step chalana; <code>fast.next.next</code> se pehle fast/fast.next check na karna; even list mein first vs second middle assume karna; circular list mein <code>current is None</code> ka wait karna.</p><p><b>Practice:</b> (1) 7-node list ka middle trace karo. (2) 10 → 20 → 30 → 40 mein returned node batao. (3) Tricky: 1 → 2 → 3 → 4 → 5 → 3 cycle mein first meeting node kya ho sakta hai? Answers abhi mat dekho.</p></section>

 <section class="subsection"><h2>2 · GAP POINTERS</h2><h3>Kaunsa problem solve karta hai?</h3><p>List ko reverse scan kiye bina standard 1-based <b>k-th node from the end</b> find karna. Example mein k=2 ka matlab end se second node.</p><h3>Basic intuition</h3><p>Pehle fast ko exactly <code>k</code> nodes aage bhejo. Isse slow aur fast ke beech k-node gap banta hai. Phir dono ek-ek step move karte hain; gap same rehta hai. Fast end par pahunchta hai toh slow end se k-th node par hota hai.</p><h3>Gap visually kya hai?</h3><p>List <code>10 → 20 → 30 → 40 → 50 → None</code>, k=2. Start mein slow → 10. Fast ko do steps: fast → 30. Fast 30 par aur slow 10 par hain; fast ke reference se end tak do nodes (40, 50) bache hain. Isi distance ko maintain karke slow ko 40 par pahunchaya jaata hai.</p>
  <h3>BEFORE LOOP</h3><p>slow → 10, fast → 10. First loop se pehle fast ko k=2 steps aage move karte hain: fast → 30. Ab main loop start hota hai.</p><table class="trace-table"><thead><tr><th>Iteration</th><th>slow/current</th><th>fast</th><th>nxt</th><th>What changed</th></tr></thead><tbody><tr><td>Before gap</td><td>slow → 10</td><td>fast → 10</td><td>not used</td><td>Both HEAD.</td></tr><tr><td>After 2-step gap</td><td>slow → 10</td><td>fast → 30</td><td>not used</td><td>fast exactly k=2 nodes ahead.</td></tr><tr><td>1</td><td>slow → 20</td><td>fast → 40</td><td>not used</td><td>Both one step; gap remains 2.</td></tr><tr><td>2</td><td>slow → 30</td><td>fast → 50</td><td>not used</td><td>Gap remains 2.</td></tr><tr><td>3</td><td>slow → 40</td><td>fast → None</td><td>not used</td><td>Fast end par; slow answer.</td></tr></tbody></table><div class="linked-chain"><span><b>SLOW → 40</b><i>prev ← 30 · next → 50</i></span><em>→</em><span><b>50</b><i>next → None</i></span></div>
  <div class="codebox"><div><span>1-based k-th from end</span><button>Copy</button></div><pre><code>def kth_from_end(self, k):
    slow = self.head
    fast = self.head

    for _ in range(k):
        fast = fast.next

    while fast:
        slow = slow.next
        fast = fast.next

    return slow</code></pre></div>
  <h3>Code line-by-line</h3><p>slow aur fast 10 par. <code>for</code> loop: fast 10→20 (step 1), 20→30 (step 2). Main loop: slow 10→20 aur fast 30→40; phir slow 20→30 aur fast 40→50; phir slow 30→40 aur fast 50→None. Loop stop, return slow = 40. Isliye 2nd node from end <b>40</b> hai, 30 nahi.</p><p><b>Time:</b> O(n). <b>Auxiliary space:</b> O(1).</p><p><b>Edge cases:</b> k=1 → last node; k=list length → first node; k=0 standard 1-based problem mein valid nahi; k&gt;length par fast.next error se pehle input validation chahiye. Empty list ka answer None.</p><p><b>GATE traps:</b> k steps ki jagah k−1 move karna; 0-based position ko k-th-from-end samajhna; fast ko k nodes ahead karne ke baad gap ko ignore karna; k=2 ka answer 30 bolna.</p><p><b>Practice:</b> (1) 6-node list, k=1. (2) 5-node list, k=5. (3) Tricky: k=0 ko standard 1-based definition mein kaise treat karoge? Answers abhi mat dekho.</p></section>

 <section class="subsection"><h2>3 · THREE REFERENCES · REVERSE SLL</h2><h3>Kaunsa problem solve karta hai?</h3><p>Singly linked list ke arrows ko ulta karke <code>10 → 20 → 30 → None</code> ko <code>30 → 20 → 10 → None</code> banana.</p><h3>Basic intuition</h3><p><code>prev</code> reversed part ke first node ko reference karta hai. <code>current</code> woh node hai jiska arrow abhi reverse karna hai. <code>nxt</code> current ke original next node ka temporary reference hai.</p><h3>Order kyun important hai?</h3><p>Pehle <code>nxt = current.next</code> se aage ki chain save karo. Phir <code>current.next = prev</code> se arrow reverse karo. Phir prev ko current par aur current ko saved nxt par move karo. Agar pehle current.next badal diya, toh original next node ka address lose ho sakta hai.</p>
  <h3>BEFORE LOOP</h3><p>prev = None. current → 10. nxt abhi set nahi. Original chain:</p><div class="linked-chain"><span><b>current → 10</b><i>next → 20</i></span><em>→</em><span><b>20</b><i>next → 30</i></span><em>→</em><span><b>30</b><i>next → None</i></span></div><table class="trace-table"><thead><tr><th>Iteration</th><th>current</th><th>prev</th><th>nxt</th><th>What changed</th></tr></thead><tbody><tr><td>Before</td><td>10</td><td>None</td><td>not set</td><td>Original chain intact.</td></tr><tr><td>1 · save</td><td>10</td><td>None</td><td>20</td><td>nxt = current.next; 20 safe.</td></tr><tr><td>1 · reverse</td><td>10</td><td>None</td><td>20</td><td>10.next = None; first arrow reversed.</td></tr><tr><td>1 · advance</td><td>20</td><td>10</td><td>20</td><td>prev=10, current=nxt.</td></tr><tr><td>2</td><td>30</td><td>20</td><td>30</td><td>20.next=10; then prev=20,current=30.</td></tr><tr><td>3</td><td>None</td><td>30</td><td>None</td><td>30.next=20; current None, stop.</td></tr></tbody></table>
  <div class="pointer-diagram"><div class="diagram-label head-label">AFTER EACH REVERSAL</div><div class="diagram-row"><span class="diagram-node"><b>10</b><i>next → None</i></span><em>←</em><span class="diagram-node"><b>20</b><i>next → 10</i></span><em>←</em><span class="diagram-node"><b>30</b><i>next → 20</i></span></div></div>
  <div class="codebox"><div><span>Reverse SLL</span><button>Copy</button></div><pre><code>def reverse(self):
    prev = None
    current = self.head

    while current:
        nxt = current.next
        current.next = prev
        prev = current
        current = nxt

    self.head = prev</code></pre></div>
  <h3>Code line-by-line</h3><p>Iteration 1: current → 10, prev=None. <code>nxt = current.next</code> se nxt → 20. <code>current.next = prev</code> se 10.next=None. <code>prev=current</code> se prev→10. <code>current=nxt</code> se current→20. Iteration 2 mein nxt→30, 20.next→10, prev→20, current→30. Iteration 3 mein nxt=None, 30.next→20, prev→30, current=None. Loop ke baad <code>self.head = prev</code>, so HEAD→30.</p><p><b>Agar save nahi kiya:</b> current 10 ka next pehle None kar doge toh 20 ka reference kho jaayega; 20→30 chain tak pahunchne ka rasta nahi bachega.</p><p><b>Time:</b> O(n). <b>Auxiliary space:</b> O(1); nxt extra reference hai, new nodes nahi.</p><p><b>Edge cases:</b> empty list mein head None; one node mein same node return; already reversed list bhi same algorithm se reverse hogi.</p><p><b>GATE traps:</b> nxt save karne ke baad hi arrow reverse karo; prev/current ko wrong order mein advance na karo; final head ko prev par set karna na bhoolo; “data swap” ko link reversal samajhna.</p><p><b>Practice:</b> (1) 4-node list ko trace karo. (2) Empty list reverse karo. (3) Tricky: current.next=prev se pehle nxt save na karne par exactly kaunsa reference lose hota hai? Answers abhi mat dekho.</p></section>
</section>`,j=document.querySelector(`#gate-patterns`);j&&(j.insertAdjacentHTML(`beforebegin`,re),j.remove()),document.querySelectorAll(`.linked-chain b`).forEach(e=>{let t=e.textContent.trim().match(/^(?:(Before|After):\s*)?(new\s+)?HEAD\s*→\s*(.+)$/i);if(!t)return;let n=t[1]?`${t[1].toUpperCase()} · `:``,r=t[2]?`NEW `:``;e.textContent=t[3],e.dataset.headLabel=`${n}${r}HEAD`,e.classList.add(`head-ref`),e.parentElement.classList.add(`head-node`),e.closest(`.linked-chain`).classList.add(`with-head`)}),document.querySelectorAll(`.linked-chain b`).forEach(e=>{let t=e.textContent.trim().match(/^current(?:_node)?\s*→\s*(.+)$/i);t&&(e.textContent=t[1],e.classList.add(`current-ref`),e.parentElement.classList.add(`current-node`),e.closest(`.linked-chain`).classList.add(`with-current`))}),document.querySelectorAll(`.linked-chain b`).forEach(e=>{let t=e.textContent.trim().match(/^previous_node\s*→\s*(.+)$/i);t&&(e.textContent=t[1],e.classList.add(`previous-ref`),e.parentElement.classList.add(`previous-node`),e.closest(`.linked-chain`).classList.add(`with-previous`))}),document.querySelectorAll(`.linked-chain b`).forEach(e=>{let t=e.textContent.trim().match(/^position\s+(\d+)\s*→\s*(.+)$/i);t&&(e.textContent=t[2],e.dataset.positionLabel=`POSITION ${t[1]}`,e.classList.add(`position-ref`),e.parentElement.classList.add(`position-node`),e.closest(`.linked-chain`).classList.add(`with-position`))}),document.querySelectorAll(`.linked-chain b`).forEach(e=>{let t=e.textContent.trim().match(/^(?:(new|old)\s+)?TAIL\s*→\s*(.+)$/i);t&&(e.textContent=t[2],e.dataset.tailLabel=`${t[1]?t[1].toUpperCase()+` `:``}TAIL`,e.classList.add(`tail-ref`),e.parentElement.classList.add(`tail-node`),e.closest(`.linked-chain`).classList.add(`with-tail`))}),document.querySelectorAll(`.chapter[id^="dll-"] .linked-chain, .chapter[id^="cdll-"] .linked-chain`).forEach(e=>{[...e.querySelectorAll(`:scope > span`)].forEach(t=>{let n=t.querySelector(`:scope > b`),r=t.querySelector(`:scope > i`);if(!n||!r)return;let i=n.textContent.trim();if(!n.classList.contains(`head-ref`)&&!n.classList.contains(`current-ref`)&&!n.classList.contains(`previous-ref`)&&!n.classList.contains(`position-ref`)&&!n.classList.contains(`tail-ref`)){let r=i.match(/^(new node|old HEAD|old|target)\s*→?\s*(.+)$/i);r&&(n.textContent=r[2],n.dataset.dllLabel=r[1].toUpperCase(),n.classList.add(`dll-ref`),t.classList.add(`dll-reference-node`),e.classList.add(`with-dll-reference`))}let a=r.textContent.trim(),o=a.match(/prev\s*(?:=|←)\s*([^·]+)/i),s=a.match(/(next\s*(?:=|→)\s*.+)$/i),c=document.createElement(`i`),l=document.createElement(`i`);c.className=`dll-prev`,l.className=`dll-next`,c.textContent=o?`prev ${a.includes(`←`)?`←`:`=`} ${o[1].trim()}`:`prev`,l.textContent=s?s[1].trim():a,r.remove(),t.classList.add(`dll-node`),t.insertBefore(c,n),t.append(l)})}),document.querySelector(`#gate-examples`)?.remove();var M=document.querySelector(`.lecture-list`);M.innerHTML=`<label><input type="checkbox" data-lecture="4.1"><span><b>4.1</b><i>Introduction</i><small>Node, head, links</small></span></label><label><input type="checkbox" data-lecture="4.2"><span><b>4.2</b><i>Memory model</i><small>Non-contiguous reachability</small></span></label><label><input type="checkbox" data-lecture="4.3"><span><b>4.3</b><i>Lists vs arrays</i><small>Trade-offs</small></span></label><label><input type="checkbox" data-lecture="4.4"><span><b>4.4</b><i>Types</i><small>SLL, CSLL, DLL, CDLL</small></span></label><label><input type="checkbox" data-lecture="4.5.1"><span><b>4.5.1</b><i>SLL Initial Setup</i><small>Node, head, length, display</small></span></label><label><input type="checkbox" data-lecture="4.5.2"><span><b>4.5.2</b><i>Insertion At Beginning</i><small>Old head preserve</small></span></label><label><input type="checkbox" data-lecture="4.5.3"><span><b>4.5.3</b><i>Insertion At End</i><small>Tail locate</small></span></label><label><input type="checkbox" data-lecture="4.5.4"><span><b>4.5.4</b><i>Insertion In Middle</i><small>Position + rewire</small></span></label><label><input type="checkbox" data-lecture="4.5.5"><span><b>4.5.5</b><i>SLL Searching</i><small>Sequential scan</small></span></label><label><input type="checkbox" data-lecture="4.5.6"><span><b>4.5.6</b><i>Deletion At Beginning</i><small>Head shift</small></span></label><label><input type="checkbox" data-lecture="4.5.7"><span><b>4.5.7</b><i>Deletion At End</i><small>Previous + last</small></span></label><label><input type="checkbox" data-lecture="4.5.8"><span><b>4.5.8</b><i>Deletion In Middle</i><small>Bypass target</small></span></label><label><input type="checkbox" data-lecture="4.6"><span><b>4.6</b><i>Circular SLL</i><small>Return-to-head stop</small></span></label><label><input type="checkbox" data-lecture="4.7"><span><b>4.7</b><i>Doubly LL</i><small>Two-way invariants</small></span></label><label><input type="checkbox" data-lecture="4.8"><span><b>4.8</b><i>Circular DLL</i><small>Four boundary links</small></span></label><label><input type="checkbox" data-lecture="4.9"><span><b>4.9</b><i>Problems + GATE</i><small>Middle, cycle, reverse</small></span></label>`,M.querySelector(`[data-lecture="4.6"]`).closest(`label`).insertAdjacentHTML(`beforebegin`,`<label><input type="checkbox" data-lecture="4.5.9"><span><b>4.5.9</b><i>SLL Complexity Analysis</i><small>Time, space, GATE traps</small></span></label>`);var ie=`<label><input type="checkbox" data-lecture="4.6"><span><b>4.6</b><i>Circular Singly Linked List</i><small>Circle invariant</small></span></label><label><input type="checkbox" data-lecture="4.6.1"><span><b>4.6.1</b><i>CSLL Initial Setup</i><small>Empty and singleton</small></span></label><label><input type="checkbox" data-lecture="4.6.2"><span><b>4.6.2</b><i>CSLL Insertion At Beginning</i><small>Last link + head shift</small></span></label><label><input type="checkbox" data-lecture="4.6.3"><span><b>4.6.3</b><i>CSLL Insertion At End</i><small>New last reconnects head</small></span></label><label><input type="checkbox" data-lecture="4.6.4"><span><b>4.6.4</b><i>CSLL Insertion In Middle</i><small>Position + rewire</small></span></label><label><input type="checkbox" data-lecture="4.6.5"><span><b>4.6.5</b><i>CSLL Searching</i><small>Return-to-head stop</small></span></label><label><input type="checkbox" data-lecture="4.6.6"><span><b>4.6.6</b><i>CSLL Deletion At Beginning</i><small>Reconnect last to new head</small></span></label><label><input type="checkbox" data-lecture="4.6.7"><span><b>4.6.7</b><i>CSLL Deletion At End</i><small>Previous node becomes last</small></span></label><label><input type="checkbox" data-lecture="4.6.8"><span><b>4.6.8</b><i>CSLL Deletion In Middle</i><small>Bypass target</small></span></label><label><input type="checkbox" data-lecture="4.6.9"><span><b>4.6.9</b><i>CSLL Complexity Analysis</i><small>Locate + rewire</small></span></label>`,N=M.querySelector(`[data-lecture="4.6"]`)?.closest(`label`);N&&(N.outerHTML=ie);var ae=`<label><input type="checkbox" data-lecture="4.7"><span><b>4.7</b><i>Doubly Linked List</i><small>Prev + next invariant</small></span></label><label><input type="checkbox" data-lecture="4.7.1"><span><b>4.7.1</b><i>DLL Initial Setup</i><small>Empty and singleton</small></span></label><label><input type="checkbox" data-lecture="4.7.2"><span><b>4.7.2</b><i>DLL Insertion At Beginning</i><small>Old head prev update</small></span></label><label><input type="checkbox" data-lecture="4.7.3"><span><b>4.7.3</b><i>DLL Insertion At End</i><small>New last, two links</small></span></label><label><input type="checkbox" data-lecture="4.7.4"><span><b>4.7.4</b><i>DLL Insertion In Middle</i><small>Four links audit</small></span></label><label><input type="checkbox" data-lecture="4.7.5"><span><b>4.7.5</b><i>DLL Searching</i><small>Forward and backward</small></span></label><label><input type="checkbox" data-lecture="4.7.6"><span><b>4.7.6</b><i>DLL Deletion At Beginning</i><small>New head prev None</small></span></label><label><input type="checkbox" data-lecture="4.7.7"><span><b>4.7.7</b><i>DLL Deletion At End</i><small>Previous becomes last</small></span></label><label><input type="checkbox" data-lecture="4.7.8"><span><b>4.7.8</b><i>DLL Deletion In Middle</i><small>Two-sided bypass</small></span></label><label><input type="checkbox" data-lecture="4.7.9"><span><b>4.7.9</b><i>DLL Complexity Analysis</i><small>Known node vs position</small></span></label>`,P=M.querySelector(`[data-lecture="4.7"]`)?.closest(`label`);P&&(P.outerHTML=ae);var F=`<label><input type="checkbox" data-lecture="4.8"><span><b>4.8</b><i>Circular Doubly Linked List</i><small>Both directions circular</small></span></label><label><input type="checkbox" data-lecture="4.8.1"><span><b>4.8.1</b><i>CDLL Initial Setup</i><small>Empty and singleton</small></span></label><label><input type="checkbox" data-lecture="4.8.2"><span><b>4.8.2</b><i>CDLL Insertion At Beginning</i><small>Five-link update</small></span></label><label><input type="checkbox" data-lecture="4.8.3"><span><b>4.8.3</b><i>CDLL Insertion At End</i><small>Tail via head.prev</small></span></label><label><input type="checkbox" data-lecture="4.8.4"><span><b>4.8.4</b><i>CDLL Insertion In Middle</i><small>Four links audit</small></span></label><label><input type="checkbox" data-lecture="4.8.5"><span><b>4.8.5</b><i>CDLL Searching</i><small>Stop at head</small></span></label><label><input type="checkbox" data-lecture="4.8.6"><span><b>4.8.6</b><i>CDLL Deletion At Beginning</i><small>New head reconnect</small></span></label><label><input type="checkbox" data-lecture="4.8.7"><span><b>4.8.7</b><i>CDLL Deletion At End</i><small>New tail reconnect</small></span></label><label><input type="checkbox" data-lecture="4.8.8"><span><b>4.8.8</b><i>CDLL Deletion In Middle</i><small>Two-sided bypass</small></span></label><label><input type="checkbox" data-lecture="4.8.9"><span><b>4.8.9</b><i>CDLL Complexity Analysis</i><small>Locate + rewire</small></span></label>`,I=M.querySelector(`[data-lecture="4.8"]`)?.closest(`label`);I&&(I.outerHTML=F),M.querySelector(`[data-lecture="4.9"]`)?.closest(`label`)?.insertAdjacentHTML(`beforebegin`,`<label><input type="checkbox" data-lecture="4.9.1"><span><b>4.9.1</b><i>Find Middle Element</i><small>Length and slow-fast</small></span></label><label><input type="checkbox" data-lecture="4.9.2"><span><b>4.9.2</b><i>Count Circular Nodes</i><small>Return-to-head stop</small></span></label><label><input type="checkbox" data-lecture="4.9.3"><span><b>4.9.3</b><i>Sum Nodes</i><small>Accumulator</small></span></label><label><input type="checkbox" data-lecture="4.9.4"><span><b>4.9.4</b><i>Maximum and Minimum</i><small>Initialize from head</small></span></label>`);var L=document.querySelector(`.module-switch`);L&&!L.querySelector(`a[href="./module5.html"]`)&&L.insertAdjacentHTML(`beforeend`,`<a href="./module5.html">M05</a>`),L&&!L.querySelector(`a[href="./module6.html"]`)&&L.insertAdjacentHTML(`beforeend`,`<a href="./module6.html">M06</a>`),L&&!L.querySelector(`a[href="./module7.html"]`)&&L.insertAdjacentHTML(`beforeend`,`<a href="./module7.html">M07</a>`);var R=[...document.querySelectorAll(`.tab`)],z=[...document.querySelectorAll(`[data-panel]`)],B=document.querySelector(`#toc`),V=document.querySelector(`.sidebar`);function H(e){B.innerHTML=[...document.querySelector(`[data-panel="${e}"]`).querySelectorAll(`[data-title]`)].map((t,n)=>(t.id||=`${e}-${n}`,`<a href="#${t.id}"><i>${String(n+1).padStart(2,`0`)}</i>${t.dataset.title}</a>`)).join(``)}function U(){document.querySelector(`#search`).value=``,document.querySelectorAll(`.searchable,.pyq-card`).forEach(e=>e.classList.remove(`hidden`)),document.querySelector(`#searchResult`).textContent=`Search current view`}function W(e){R.forEach(t=>t.classList.toggle(`active`,t.dataset.view===e)),z.forEach(t=>t.classList.toggle(`active`,t.dataset.panel===e)),H(e),window.scrollTo({top:0,behavior:`smooth`}),U()}R.forEach(e=>e.onclick=()=>W(e.dataset.view)),document.querySelectorAll(`[data-jump]`).forEach(e=>e.onclick=()=>W(e.dataset.jump)),H(`notes`);var G=document.querySelector(`#pointer-vocabulary .linked-chain`);G&&(G.className=`pointer-diagram`,G.innerHTML=`<div class="diagram-label head-label">HEAD</div><div class="diagram-row"><span class="diagram-node"><b>A</b><i>next → B</i></span><em>→</em><span class="diagram-node"><b>B</b><i>next → C</i></span><em>→</em><span class="diagram-node"><b>C</b><i>next → None</i></span></div><div class="diagram-label tail-label">TAIL</div>`),document.querySelector(`#zero-start .linked-chain`)?.remove(),document.querySelector(`#zero-start .reading-method`)?.remove(),document.querySelector(`#themeButton`).onclick=()=>{document.documentElement.classList.toggle(`dark`),localStorage.setItem(`da-theme`,document.documentElement.classList.contains(`dark`)?`dark`:`light`)},localStorage.getItem(`da-theme`)!==`light`&&document.documentElement.classList.add(`dark`),document.querySelector(`#searchButton`).onclick=()=>{document.querySelector(`.searchbox`).classList.toggle(`open`),document.querySelector(`#search`).focus()},document.querySelector(`#search`).oninput=e=>{let t=e.target.value.toLowerCase().trim(),n=[...document.querySelector(`.view.active`).querySelectorAll(`.searchable,.pyq-card`)],r=0;n.forEach(e=>{let n=!t||e.textContent.toLowerCase().includes(t);e.classList.toggle(`hidden`,!n),n&&r++}),document.querySelector(`#searchResult`).textContent=t?`${r} matching blocks`:`Search current view`},document.querySelectorAll(`.codebox button`).forEach(e=>e.onclick=async()=>{await navigator.clipboard.writeText(e.closest(`.codebox`).querySelector(`code`).innerText);let t=document.querySelector(`.toast`);t.classList.add(`show`),setTimeout(()=>t.classList.remove(`show`),1e3)}),document.querySelectorAll(`.filter`).forEach(e=>e.onclick=()=>{document.querySelectorAll(`.filter`).forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),document.querySelectorAll(`.pyq-card`).forEach(t=>t.classList.toggle(`filtered`,e.dataset.year!==`all`&&t.dataset.year!==e.dataset.year))});var K=!1;document.querySelector(`#expand`).onclick=e=>{K=!K,document.querySelectorAll(`.pyq-card:not(.filtered)`).forEach(e=>e.open=K),e.target.textContent=K?`Collapse all`:`Expand all`};var q=[...document.querySelectorAll(`[data-lecture]`)],oe=JSON.parse(localStorage.getItem(`da-m4-lectures`)||`[]`);q.forEach(e=>{e.checked=oe.includes(e.dataset.lecture),e.onchange=J});function J(){let e=q.filter(e=>e.checked).map(e=>e.dataset.lecture),t=Math.round(e.length/q.length*100);localStorage.setItem(`da-m4-lectures`,JSON.stringify(e)),document.querySelector(`#count`).textContent=`${e.length}/${q.length}`,document.querySelector(`#bar`).style.width=`${t}%`,document.querySelector(`#lecturePercent`).textContent=`${t}%`}J();var Y=e=>String(e).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`),X=new Set(JSON.parse(localStorage.getItem(`da-m4-practice`)||`[]`)),Z=document.querySelector(`#practiceTopic`),Q=document.querySelector(`#practiceDifficulty`);function $(){let e=_.find(e=>e.id===Z.value)||_[0],t=Q.value,n=t===`all`?e.questions:e.questions.filter(e=>e.difficulty===t),r=e.questions.filter(e=>X.has(e.id)).length,i=[...new Set(e.questions.map(e=>e.pattern))];document.querySelector(`#practiceScore`).textContent=`${r}/${e.questions.length}`,document.querySelector(`#practiceContext`).innerHTML=`<div><span>Topic ${Y(e.number)}</span><h2>${Y(e.label)}</h2><p>Har question ke liye before/after links draw karo. Answer explanation tab hi kholo jab invariant audit complete ho.</p></div><aside><b>${n.length} shown</b><small>${i.length} patterns</small><p>${i.map(Y).join(` · `)}</p></aside>`,document.querySelector(`#questionList`).innerHTML=n.length?n.map(t=>`<article class="practice-question searchable ${X.has(t.id)?`attempted`:``}" data-title="${Y(e.label)} question ${t.number}"><div class="question-meta"><span>Q${String(t.number).padStart(2,`0`)}</span><i>${Y(t.difficulty)}</i><b>${Y(t.pattern)}</b></div><h3>${Y(t.prompt)}</h3><ol class="question-options" type="A">${t.options.map(e=>`<li>${Y(e)}</li>`).join(``)}</ol><details class="answer-reveal"><summary>Answer + explanation dekho</summary><div><strong>Correct: ${Y(t.answer)}</strong><p>${t.explanation}</p><small>Known node vs position-search cost separate likho.</small></div></details><label class="attempt-check"><input type="checkbox" data-attempt="${t.id}" ${X.has(t.id)?`checked`:``}><span>Attempted</span></label></article>`).join(``):`<article class="practice-question"><h3>Is level ke questions nahi hain. All levels select karo.</h3></article>`,document.querySelectorAll(`[data-attempt]`).forEach(t=>t.onchange=()=>{t.checked?X.add(t.dataset.attempt):X.delete(t.dataset.attempt),localStorage.setItem(`da-m4-practice`,JSON.stringify([...X])),t.closest(`.practice-question`).classList.toggle(`attempted`,t.checked),document.querySelector(`#practiceScore`).textContent=`${e.questions.filter(e=>X.has(e.id)).length}/${e.questions.length}`})}Z.onchange=$,Q.onchange=$,$(),Object.entries({intro:`intro`,compare:`compare`,types:`types`,"sll-setup":`sll-setup`,"sll-insert-beginning":`sll-insert-beginning`,"sll-insert-end":`sll-insert-end`,"sll-insert-middle":`sll-insert-middle`,"sll-search":`sll-search`,"sll-delete-beginning":`sll-delete-beginning`,"sll-delete-end":`sll-delete-end`,"sll-delete-middle":`sll-delete-middle`,"sll-complexity":`sll-complexity`,"csll-complexity":`csll`,"dll-complexity":`dll`,cdll:`cdll`,coding:`coding`,"gate-patterns":`gate-patterns`}).forEach(([e,t])=>{let n=document.querySelector(`#${e}`),r=_.find(e=>e.id===t);n&&r&&n.insertAdjacentHTML(`beforeend`,`<button class="topic-practice" data-practice-topic="${t}">Is topic ke ${r.questions.length} questions solve karo →</button>`)}),document.querySelectorAll(`[data-practice-topic]`).forEach(e=>e.onclick=()=>{Z.value=e.dataset.practiceTopic,Q.value=`all`,$(),W(`practice`)}),document.querySelector(`#print`).onclick=()=>window.print(),document.querySelector(`#menu`).onclick=()=>V.classList.toggle(`open`),B.onclick=()=>V.classList.remove(`open`),window.onscroll=()=>{let e=document.documentElement.scrollHeight-innerHeight;document.querySelector(`.read-progress span`).style.width=`${e?100*scrollY/e:0}%`};