/**
 * DevPilot-AI — Object-Oriented Programming Question Bank
 * 120 authentic placement/interview MCQs across 12 topics.
 */

(function () {
  'use strict';

  const oopData = {
    category: "oop",
    title: "Object-Oriented Programming",
    description: "Classes, encapsulation, inheritance, polymorphism, design patterns, SOLID principles, and OOP scenarios.",
    icon: "category",
    totalTopics: 12,
    topics: [
  "Classes & Objects",
  "Encapsulation",
  "Abstraction",
  "Inheritance",
  "Polymorphism",
  "Constructors & Destructors",
  "Overloading vs Overriding",
  "Virtual Functions",
  "Interfaces / Abstract Classes",
  "SOLID Fundamentals",
  "Composition vs Inheritance",
  "Common OOP Interview Scenarios"
],
    questions: [
  {
    "id": "oop-cls-01",
    "category": "oop",
    "topic": "Classes & Objects",
    "difficulty": "easy",
    "question": "What is the fundamental difference between a Class and an Object in OOP?",
    "options": [
      "A Class is a blueprint/template defining state and behavior; an Object is a concrete instantiated instance residing in memory",
      "A Class uses memory on the heap; an Object uses memory on the stack",
      "A Class can only have functions; an Object can only have variables",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "A class provides the type definition; objects are allocated runtime instances with independent state."
  },
  {
    "id": "oop-cls-02",
    "category": "oop",
    "topic": "Classes & Objects",
    "difficulty": "easy",
    "question": "In Java/C++, what does the 'this' keyword reference within an instance method?",
    "options": [
      "A pointer/reference to the current invoking object instance",
      "The parent class object",
      "The main() function",
      "A global variable"
    ],
    "correctAnswer": 0,
    "explanation": "'this' refers to the specific object instance on which the current method was called."
  },
  {
    "id": "oop-cls-03",
    "category": "oop",
    "topic": "Classes & Objects",
    "difficulty": "easy",
    "question": "What is the size of an empty class in C++ (class Empty {}; sizeof(Empty))?",
    "options": [
      "1 byte (to ensure distinct memory addresses for different object instances)",
      "0 bytes",
      "4 bytes",
      "Depends on the CPU"
    ],
    "correctAnswer": 0,
    "explanation": "In C++, empty classes have a non-zero size of 1 byte so that two distinct instances possess unique memory addresses."
  },
  {
    "id": "oop-cls-04",
    "category": "oop",
    "topic": "Classes & Objects",
    "difficulty": "easy",
    "question": "What is an 'instance variable' as opposed to a 'static variable'?",
    "options": [
      "Instance variables belong to a specific object instance; static variables are shared across all instances of the class",
      "Instance variables cannot be modified",
      "Static variables are stored on the stack",
      "Instance variables are only declared in interfaces"
    ],
    "correctAnswer": 0,
    "explanation": "Static variables exist once per class; instance variables are duplicated for every new object allocated."
  },
  {
    "id": "oop-cls-05",
    "category": "oop",
    "topic": "Classes & Objects",
    "difficulty": "medium",
    "question": "In Java, where are objects always allocated in memory?",
    "options": [
      "On the Heap",
      "On the Stack",
      "In the CPU Cache",
      "In the Text segment"
    ],
    "correctAnswer": 0,
    "explanation": "In Java, all objects created with 'new' reside on the Heap, while references to them may live on the stack."
  },
  {
    "id": "oop-cls-06",
    "category": "oop",
    "topic": "Classes & Objects",
    "difficulty": "medium",
    "question": "What is an 'anonymous object' in OOP?",
    "options": [
      "An object instantiated without an assigned variable reference, often used as a one-time method argument or return value",
      "An object created by a hacker",
      "An object without a class definition",
      "An object with a private constructor"
    ],
    "correctAnswer": 0,
    "explanation": "Anonymous objects (e.g. new Date().getTime() or print(new Point(1, 2))) have no named variable reference."
  },
  {
    "id": "oop-cls-07",
    "category": "oop",
    "topic": "Classes & Objects",
    "difficulty": "medium",
    "question": "What is the role of an Access Specifier in a class declaration?",
    "options": [
      "Controls the visibility and accessibility of class members from outside the class (e.g., public, private, protected)",
      "Allocates memory for variables",
      "Determines variable sorting order",
      "Compiles the class into binary"
    ],
    "correctAnswer": 0,
    "explanation": "Access specifiers enforce encapsulation boundaries by restricting member visibility."
  },
  {
    "id": "oop-cls-08",
    "category": "oop",
    "topic": "Classes & Objects",
    "difficulty": "medium",
    "question": "In Python, how is an instance method defined inside a class?",
    "options": [
      "def method_name(self, ...): with 'self' as the first explicit parameter",
      "def method_name(this, ...):",
      "function method_name()",
      "method method_name()"
    ],
    "correctAnswer": 0,
    "explanation": "Python requires explicit declaration of 'self' as the first parameter to bind the instance to the method."
  },
  {
    "id": "oop-cls-09",
    "category": "oop",
    "topic": "Classes & Objects",
    "difficulty": "hard",
    "question": "What is the 'Singleton Pattern' applied to classes?",
    "options": [
      "A design pattern that restricts a class to exactly one instantiated instance across the application lifecycle",
      "A class with only one method",
      "A class with only one variable",
      "A class that cannot be inherited"
    ],
    "correctAnswer": 0,
    "explanation": "Singleton ensures a single global point of access by making the constructor private and storing a static instance."
  },
  {
    "id": "oop-cls-10",
    "category": "oop",
    "topic": "Classes & Objects",
    "difficulty": "hard",
    "question": "What happens in C++ when an object is passed by value to a function?",
    "options": [
      "The class's Copy Constructor is invoked to create a duplicate object in the function's stack frame",
      "The original object is moved",
      "A compile error occurs",
      "Memory is allocated on the heap"
    ],
    "correctAnswer": 0,
    "explanation": "Pass-by-value in C++ triggers the copy constructor (or move constructor if an rvalue) to construct the parameter."
  },
  {
    "id": "oop-enc-01",
    "category": "oop",
    "topic": "Encapsulation",
    "difficulty": "easy",
    "question": "What is Encapsulation in Object-Oriented Programming?",
    "options": [
      "Bundling data (attributes) and methods that operate on that data into a single unit, and restricting direct external access to internal state",
      "Inheriting attributes from a base class",
      "Overriding functions in child classes",
      "Splitting code across multiple files"
    ],
    "correctAnswer": 0,
    "explanation": "Encapsulation combines data and behavior while shielding internal state from arbitrary outside corruption."
  },
  {
    "id": "oop-enc-02",
    "category": "oop",
    "topic": "Encapsulation",
    "difficulty": "easy",
    "question": "How is data hiding conventionally achieved in classes?",
    "options": [
      "Declaring variables as 'private' and providing controlled 'public' getters and setters",
      "Making all variables public",
      "Writing code in binary",
      "Encrypting source files"
    ],
    "correctAnswer": 0,
    "explanation": "Private member variables paired with public accessor/mutator methods encapsulate and validate mutations."
  },
  {
    "id": "oop-enc-03",
    "category": "oop",
    "topic": "Encapsulation",
    "difficulty": "easy",
    "question": "What is a primary benefit of using Getters and Setters rather than public variables?",
    "options": [
      "Allows data validation, business logic enforcement, and logging before modifying internal state",
      "Makes execution twice as fast",
      "Reduces class memory footprint",
      "Prevents compilation errors"
    ],
    "correctAnswer": 0,
    "explanation": "Setters enable defensive validation (e.g. ensuring age >= 0) and maintain backward compatibility if representation changes."
  },
  {
    "id": "oop-enc-04",
    "category": "oop",
    "topic": "Encapsulation",
    "difficulty": "easy",
    "question": "Which access specifier makes members accessible within the defining class and its subclasses, but hidden from the outside world?",
    "options": [
      "protected",
      "private",
      "public",
      "internal"
    ],
    "correctAnswer": 0,
    "explanation": "'protected' allows derived classes to inherit and access members while keeping them shielded from external clients."
  },
  {
    "id": "oop-enc-05",
    "category": "oop",
    "topic": "Encapsulation",
    "difficulty": "medium",
    "question": "What is the difference between 'private' and 'protected' access in C++ and Java?",
    "options": [
      "Private members are only accessible within the defining class; protected members are accessible within the defining class and derived subclasses",
      "Protected members are public to everyone",
      "Private members can be inherited",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "Subclasses inherit protected members with direct access, but cannot access private members of the parent class directly."
  },
  {
    "id": "oop-enc-06",
    "category": "oop",
    "topic": "Encapsulation",
    "difficulty": "medium",
    "question": "In JavaScript (ES2022+), how are private class fields natively declared?",
    "options": [
      "Using the '#' prefix (e.g. #balance = 0;)",
      "Using the 'private' keyword",
      "Using an underscore prefix (_balance)",
      "Using the 'hidden' keyword"
    ],
    "correctAnswer": 0,
    "explanation": "Modern ECMAScript provides true hard privacy using the '#' prefix syntax for private fields and methods."
  },
  {
    "id": "oop-enc-07",
    "category": "oop",
    "topic": "Encapsulation",
    "difficulty": "medium",
    "question": "How does encapsulation promote loose coupling in software architecture?",
    "options": [
      "External consumers interact only with stable public APIs without depending on internal implementation details",
      "By combining all code into a single file",
      "By eliminating the need for unit testing",
      "By removing variable types"
    ],
    "correctAnswer": 0,
    "explanation": "When internal data structures change (e.g. array to hash map), consumers using public methods remain unaffected."
  },
  {
    "id": "oop-enc-08",
    "category": "oop",
    "topic": "Encapsulation",
    "difficulty": "medium",
    "question": "Can a class achieve complete immutability through encapsulation?",
    "options": [
      "Yes, by declaring all fields private and final/const, initializing them solely via constructor, and providing no setters",
      "No, OOP does not support immutability",
      "Only if the class has no methods",
      "Only in functional programming languages"
    ],
    "correctAnswer": 0,
    "explanation": "Immutable objects (like Java's String) encapsulate state so that fields cannot be altered post-instantiation."
  },
  {
    "id": "oop-enc-09",
    "category": "oop",
    "topic": "Encapsulation",
    "difficulty": "hard",
    "question": "In C++, what does a 'friend' function or class do regarding encapsulation?",
    "options": [
      "Bypasses encapsulation by granting an external function or class full access to its private and protected members",
      "Deletes private variables",
      "Forces all members to become public",
      "Creates a friendly UI dialog"
    ],
    "correctAnswer": 0,
    "explanation": "Friend declarations explicitly permit designated external entities to inspect and modify private internals."
  },
  {
    "id": "oop-enc-10",
    "category": "oop",
    "topic": "Encapsulation",
    "difficulty": "hard",
    "question": "What is the 'Tell, Don't Ask' principle related to encapsulation?",
    "options": [
      "Tell objects what behavior to execute rather than asking them for their internal data and performing logic externally",
      "Never ask the user for input",
      "Do not use functions with return values",
      "Always print data to the console"
    ],
    "correctAnswer": 0,
    "explanation": "'Tell, Don't Ask' co-locates data and behavior, preventing procedural logic from manipulating anemic objects externally."
  },
  {
    "id": "oop-abs-01",
    "category": "oop",
    "topic": "Abstraction",
    "difficulty": "easy",
    "question": "What is Abstraction in OOP?",
    "options": [
      "Hiding background implementation complexity and exposing only essential, relevant features to the user",
      "Copying code from another class",
      "Making variables private",
      "Executing code on multiple threads"
    ],
    "correctAnswer": 0,
    "explanation": "Abstraction filters out non-essential operational details, presenting a clean, simplified conceptual interface."
  },
  {
    "id": "oop-abs-02",
    "category": "oop",
    "topic": "Abstraction",
    "difficulty": "easy",
    "question": "How is abstraction implemented in C++?",
    "options": [
      "Using Abstract Classes with Pure Virtual Functions",
      "Using #include statements",
      "Using global variables",
      "Using while loops"
    ],
    "correctAnswer": 0,
    "explanation": "Classes containing at least one pure virtual function (virtual void func() = 0;) serve as abstract interfaces in C++."
  },
  {
    "id": "oop-abs-03",
    "category": "oop",
    "topic": "Abstraction",
    "difficulty": "easy",
    "question": "What is the real-world analogy for Abstraction?",
    "options": [
      "Driving a car: pressing the accelerator makes it move without needing to understand the engine's internal combustion thermodynamics",
      "A secret diary locked in a drawer",
      "Copying a recipe from a book",
      "Painting a canvas"
    ],
    "correctAnswer": 0,
    "explanation": "The driver interacts with simple controls (steering, pedals) while engine mechanics remain abstracted away."
  },
  {
    "id": "oop-abs-04",
    "category": "oop",
    "topic": "Abstraction",
    "difficulty": "easy",
    "question": "Can you instantiate an object directly from an Abstract Class in Java or C++?",
    "options": [
      "No, abstract classes cannot be directly instantiated with 'new'",
      "Yes, abstract classes behave identically to normal classes",
      "Only if it has no methods",
      "Only in main()"
    ],
    "correctAnswer": 0,
    "explanation": "Abstract classes serve as incomplete templates; only concrete derived subclasses implementing all abstract methods can be instantiated."
  },
  {
    "id": "oop-abs-05",
    "category": "oop",
    "topic": "Abstraction",
    "difficulty": "medium",
    "question": "What is the difference between Abstraction and Encapsulation?",
    "options": [
      "Abstraction hides complexity by focusing on *what* an object does; Encapsulation hides internal state by focusing on *how* data is secured",
      "They are exact synonyms with no distinction",
      "Abstraction is for variables; Encapsulation is for functions",
      "Encapsulation is only used in C++"
    ],
    "correctAnswer": 0,
    "explanation": "Abstraction is about interface design (exposing essential behavior); Encapsulation is about boundary containment (protecting data)."
  },
  {
    "id": "oop-abs-06",
    "category": "oop",
    "topic": "Abstraction",
    "difficulty": "medium",
    "question": "In Java, can an abstract class have constructors?",
    "options": [
      "Yes, to initialize fields inherited by concrete subclasses during super() calls",
      "No, abstract classes cannot have constructors",
      "Only static constructors are allowed",
      "Only if all methods are abstract"
    ],
    "correctAnswer": 0,
    "explanation": "Abstract classes have constructors invoked by subclass constructors via super() to initialize base state."
  },
  {
    "id": "oop-abs-07",
    "category": "oop",
    "topic": "Abstraction",
    "difficulty": "medium",
    "question": "What is a 'pure virtual function' in C++?",
    "options": [
      "A virtual function with '= 0' in its declaration, containing no implementation in the base class and requiring subclass implementation",
      "A function that has no parameters",
      "A function that cannot be overridden",
      "A function written in pure C"
    ],
    "correctAnswer": 0,
    "explanation": "'virtual void draw() = 0;' declares a pure virtual function, transforming the enclosing class into an abstract class."
  },
  {
    "id": "oop-abs-08",
    "category": "oop",
    "topic": "Abstraction",
    "difficulty": "medium",
    "question": "Can an abstract class contain fully implemented concrete methods?",
    "options": [
      "Yes, abstract classes can contain a mix of abstract methods and fully implemented concrete methods",
      "No, all methods in an abstract class must be abstract",
      "Only if marked with the 'default' keyword",
      "Only in C++, not in Java"
    ],
    "correctAnswer": 0,
    "explanation": "Abstract classes provide shared common logic in concrete methods alongside abstract method signatures."
  },
  {
    "id": "oop-abs-09",
    "category": "oop",
    "topic": "Abstraction",
    "difficulty": "hard",
    "question": "What is the 'Template Method' design pattern based on abstraction?",
    "options": [
      "An abstract class defines the invariant skeletal steps of an algorithm in a concrete method, deferring specific steps to abstract methods implemented by subclasses",
      "A C++ template that takes multiple types",
      "A design pattern for creating web templates",
      "A method with no arguments"
    ],
    "correctAnswer": 0,
    "explanation": "Template Method enforces an invariant workflow in the base class while letting subclasses customize individual steps."
  },
  {
    "id": "oop-abs-10",
    "category": "oop",
    "topic": "Abstraction",
    "difficulty": "hard",
    "question": "Why do software architectures prefer programming to an abstraction/interface rather than a concrete implementation?",
    "options": [
      "It decouples callers from concrete classes, allowing implementations to be swapped, mocked for testing, or extended without breaking clients",
      "It improves raw CPU floating-point performance",
      "It reduces binary file size by 50%",
      "It eliminates the need for compilation"
    ],
    "correctAnswer": 0,
    "explanation": "Programming to interfaces adheres to Dependency Inversion, enabling modularity and seamless dependency injection."
  },
  {
    "id": "oop-inh-01",
    "category": "oop",
    "topic": "Inheritance",
    "difficulty": "easy",
    "question": "What is the primary benefit of Inheritance in OOP?",
    "options": [
      "Code reusability and establishing an 'IS-A' hierarchical relationship between classes",
      "Faster variable memory lookups",
      "Eliminating the need for compilers",
      "Preventing data modification"
    ],
    "correctAnswer": 0,
    "explanation": "Inheritance enables derived classes to absorb attributes and behaviors from base classes, promoting reuse and subtyping."
  },
  {
    "id": "oop-inh-02",
    "category": "oop",
    "topic": "Inheritance",
    "difficulty": "easy",
    "question": "Which type of inheritance allows a derived class to inherit directly from multiple base classes simultaneously?",
    "options": [
      "Multiple Inheritance",
      "Single Inheritance",
      "Multilevel Inheritance",
      "Hierarchical Inheritance"
    ],
    "correctAnswer": 0,
    "explanation": "Multiple inheritance involves a child class having two or more direct parent classes (supported in C++, Python; not directly in Java classes)."
  },
  {
    "id": "oop-inh-03",
    "category": "oop",
    "topic": "Inheritance",
    "difficulty": "easy",
    "question": "What is 'Multilevel Inheritance'?",
    "options": [
      "A class inherits from a derived class, forming a vertical inheritance chain (e.g. Class C extends B, and B extends A)",
      "A class with multiple constructors",
      "A class inherited by 10 child classes",
      "Inheriting both interfaces and classes"
    ],
    "correctAnswer": 0,
    "explanation": "Multilevel inheritance creates an ancestral derivation ladder (Grandparent -> Parent -> Child)."
  },
  {
    "id": "oop-inh-04",
    "category": "oop",
    "topic": "Inheritance",
    "difficulty": "easy",
    "question": "Why does Java NOT support multiple inheritance of classes (e.g. 'class C extends A, B')?",
    "options": [
      "To prevent ambiguity problems such as the 'Diamond Problem' where conflicting method implementations collide",
      "Because Java only supports 32-bit systems",
      "Because classes in Java cannot have methods",
      "To make compilation slower"
    ],
    "correctAnswer": 0,
    "explanation": "Java avoids the Diamond Problem by disallowing multiple class inheritance, opting for multiple interface implementation instead."
  },
  {
    "id": "oop-inh-05",
    "category": "oop",
    "topic": "Inheritance",
    "difficulty": "medium",
    "question": "What is the 'Diamond Problem' in multiple inheritance?",
    "options": [
      "Ambiguity when a class inherits from two classes that both inherit from the same common ancestor, leading to duplicate base instances and conflicting method implementations",
      "A memory leak in graphical user interfaces",
      "When a constructor calls itself in a diamond loop",
      "An encryption algorithm flaw"
    ],
    "correctAnswer": 0,
    "explanation": "If B and C override A's method, and D inherits from both B and C, D cannot determine which implementation to invoke."
  },
  {
    "id": "oop-inh-06",
    "category": "oop",
    "topic": "Inheritance",
    "difficulty": "medium",
    "question": "How does C++ solve the Diamond Problem in multiple inheritance?",
    "options": [
      "Using 'virtual' base classes (e.g., class B : virtual public A)",
      "By deleting the child class",
      "By ignoring the grandparent class",
      "By forcing all methods to be static"
    ],
    "correctAnswer": 0,
    "explanation": "Virtual base inheritance ensures only a single shared instance of the ancestor class exists within derived objects."
  },
  {
    "id": "oop-inh-07",
    "category": "oop",
    "topic": "Inheritance",
    "difficulty": "medium",
    "question": "In Java, which keyword is used to explicitly invoke the immediate parent class's constructor or methods?",
    "options": [
      "super",
      "parent",
      "base",
      "this"
    ],
    "correctAnswer": 0,
    "explanation": "'super()' calls the parent constructor, and 'super.methodName()' invokes the parent class implementation."
  },
  {
    "id": "oop-inh-08",
    "category": "oop",
    "topic": "Inheritance",
    "difficulty": "medium",
    "question": "What is the order of constructor execution in an inheritance hierarchy (Base -> Derived)?",
    "options": [
      "Base class constructor executes first, followed by Derived class constructor",
      "Derived class constructor executes first, followed by Base",
      "Both execute simultaneously on different threads",
      "Only the Derived constructor executes"
    ],
    "correctAnswer": 0,
    "explanation": "The base class foundation must be completely constructed before derived member initializations proceed."
  },
  {
    "id": "oop-inh-09",
    "category": "oop",
    "topic": "Inheritance",
    "difficulty": "hard",
    "question": "In C++, what does 'private inheritance' (class Derived : private Base) mean?",
    "options": [
      "Public and protected members of Base become private members of Derived, representing an 'implemented-in-terms-of' relationship rather than 'IS-A'",
      "Base class members are deleted",
      "Derived cannot access any Base members",
      "Derived can only be instantiated once"
    ],
    "correctAnswer": 0,
    "explanation": "Private inheritance is an implementation detail where Base's public interface is hidden from external consumers of Derived."
  },
  {
    "id": "oop-inh-10",
    "category": "oop",
    "topic": "Inheritance",
    "difficulty": "hard",
    "question": "What is the Liskov Substitution Principle (LSP) regarding inheritance?",
    "options": [
      "Objects of a superclass should be replaceable with objects of a subclass without breaking application correctness",
      "Subclasses must have more methods than superclasses",
      "Derived classes should never override base methods",
      "A class must inherit from at least two parents"
    ],
    "correctAnswer": 0,
    "explanation": "LSP mandates that derived classes must honor the behavioral contracts and invariants established by their base types."
  },
  {
    "id": "oop-ply-01",
    "category": "oop",
    "topic": "Polymorphism",
    "difficulty": "easy",
    "question": "What does Polymorphism literally mean in Computer Science?",
    "options": [
      "'Many forms'—the ability of different classes to respond to the same interface or method call in their own specialized way",
      "Having multiple variables of the same name",
      "Splitting an application across multiple servers",
      "Converting integers to strings"
    ],
    "correctAnswer": 0,
    "explanation": "Polymorphism allows objects of different types to be treated uniformly through a shared interface while exhibiting distinct behaviors."
  },
  {
    "id": "oop-ply-02",
    "category": "oop",
    "topic": "Polymorphism",
    "difficulty": "easy",
    "question": "What are the two primary types of polymorphism in OOP?",
    "options": [
      "Compile-time (Static) Polymorphism and Runtime (Dynamic) Polymorphism",
      "Synchronous and Asynchronous Polymorphism",
      "Hardware and Software Polymorphism",
      "Linear and Binary Polymorphism"
    ],
    "correctAnswer": 0,
    "explanation": "Compile-time polymorphism is resolved during compilation; runtime polymorphism is resolved dynamically at execution."
  },
  {
    "id": "oop-ply-03",
    "category": "oop",
    "topic": "Polymorphism",
    "difficulty": "easy",
    "question": "Which of the following is an example of Compile-Time (Static) Polymorphism?",
    "options": [
      "Method Overloading (and Operator Overloading in C++)",
      "Method Overriding with virtual functions",
      "Interface dynamic dispatch",
      "Garbage collection"
    ],
    "correctAnswer": 0,
    "explanation": "Method and operator overloading are resolved at compile time based on parameter signatures."
  },
  {
    "id": "oop-ply-04",
    "category": "oop",
    "topic": "Polymorphism",
    "difficulty": "easy",
    "question": "Which mechanism enables Runtime (Dynamic) Polymorphism in C++ and Java?",
    "options": [
      "Method Overriding through dynamic dispatch / virtual methods",
      "Private static helper methods",
      "Macro expansion",
      "Global variables"
    ],
    "correctAnswer": 0,
    "explanation": "Method overriding lets a subclass provide a specific implementation of a method declared in its parent, dispatched at runtime."
  },
  {
    "id": "oop-ply-05",
    "category": "oop",
    "topic": "Polymorphism",
    "difficulty": "medium",
    "question": "In Java, what does the '@Override' annotation achieve?",
    "options": [
      "Instructs the compiler to verify that the annotated method correctly overrides a method in the superclass, raising a compile error if it does not",
      "Makes the method run twice as fast",
      "Prevents subclasses from modifying the method",
      "Converts the method to a static method"
    ],
    "correctAnswer": 0,
    "explanation": "@Override catches spelling or signature mismatches at compile time rather than silently creating an overload."
  },
  {
    "id": "oop-ply-06",
    "category": "oop",
    "topic": "Polymorphism",
    "difficulty": "medium",
    "question": "What is 'dynamic dispatch' in object-oriented execution?",
    "options": [
      "The process of selecting which polymorphic method implementation to call at runtime based on the actual type of the invoking object",
      "Sending network packets to servers dynamically",
      "Allocating variables on the heap",
      "Compiling code in the background"
    ],
    "correctAnswer": 0,
    "explanation": "Dynamic dispatch resolves the concrete target method for an object reference at runtime."
  },
  {
    "id": "oop-ply-07",
    "category": "oop",
    "topic": "Polymorphism",
    "difficulty": "medium",
    "question": "Can static methods be overridden polymorphically in Java?",
    "options": [
      "No, static methods are bound at compile time based on the reference type; they can only be 'hidden', not overridden polymorphically",
      "Yes, static methods override normally",
      "Only if marked public",
      "Only if the class is abstract"
    ],
    "correctAnswer": 0,
    "explanation": "Static methods belong to classes, not instances, and do not participate in dynamic virtual dispatch."
  },
  {
    "id": "oop-ply-08",
    "category": "oop",
    "topic": "Polymorphism",
    "difficulty": "medium",
    "question": "What is 'Operator Overloading' in C++?",
    "options": [
      "Giving existing C++ operators (like +, -, <<) custom definitions when applied to user-defined class objects",
      "Executing two operators at the same time",
      "Using too many operators in one statement",
      "A compiler error when adding floats to ints"
    ],
    "correctAnswer": 0,
    "explanation": "Operator overloading allows custom types (like Vector or Complex) to be manipulated with natural mathematical syntax."
  },
  {
    "id": "oop-ply-09",
    "category": "oop",
    "topic": "Polymorphism",
    "difficulty": "hard",
    "question": "What is the 'vtable' (Virtual Method Table) in C++?",
    "options": [
      "An array of function pointers maintained by the compiler per polymorphic class to resolve virtual function calls dynamically at runtime",
      "A table in an SQL database",
      "A list of global variables",
      "A table of compilation warnings"
    ],
    "correctAnswer": 0,
    "explanation": "Each polymorphic class has a vtable, and each instance carries a hidden vptr pointing to that table for dynamic dispatch."
  },
  {
    "id": "oop-ply-10",
    "category": "oop",
    "topic": "Polymorphism",
    "difficulty": "hard",
    "question": "What is 'object slicing' in C++?",
    "options": [
      "When a derived class object is assigned by value to a base class object, stripping away all derived member variables and virtual behaviors",
      "Dividing an array of objects into chunks",
      "Deleting an object with multiple pointers",
      "A memory leak caused by inheritance"
    ],
    "correctAnswer": 0,
    "explanation": "Passing by value copies only the Base slice of a Derived object, slicing off subclass members and reverting vptr."
  },
  {
    "id": "oop-cd-01",
    "category": "oop",
    "topic": "Constructors & Destructors",
    "difficulty": "easy",
    "question": "What is a Constructor in OOP?",
    "options": [
      "A special member method automatically invoked when an object of the class is instantiated, used to initialize state",
      "A function that destroys objects",
      "A tool that compiles code",
      "A method that returns a boolean"
    ],
    "correctAnswer": 0,
    "explanation": "Constructors initialize instance attributes when objects are allocated with 'new'."
  },
  {
    "id": "oop-cd-02",
    "category": "oop",
    "topic": "Constructors & Destructors",
    "difficulty": "easy",
    "question": "What is the return type of a Constructor in C++ and Java?",
    "options": [
      "Constructors have no return type, not even void",
      "void",
      "int",
      "pointer to object"
    ],
    "correctAnswer": 0,
    "explanation": "Constructors cannot specify any return type; their purpose is object initialization."
  },
  {
    "id": "oop-cd-03",
    "category": "oop",
    "topic": "Constructors & Destructors",
    "difficulty": "easy",
    "question": "What is a 'Default Constructor'?",
    "options": [
      "A constructor that takes no arguments, provided automatically by the compiler if no explicit constructor is defined",
      "A constructor that deletes objects",
      "A constructor that sets all values to null",
      "A private constructor"
    ],
    "correctAnswer": 0,
    "explanation": "Default constructors accept zero parameters and initialize fields to baseline defaults."
  },
  {
    "id": "oop-cd-04",
    "category": "oop",
    "topic": "Constructors & Destructors",
    "difficulty": "easy",
    "question": "What is a 'Destructor' in C++?",
    "options": [
      "A special member function invoked automatically when an object's lifetime ends, used to release allocated resources (memory, file handles)",
      "A function that causes crashes",
      "A tool that deletes files",
      "A constructor with parameters"
    ],
    "correctAnswer": 0,
    "explanation": "Destructors (~ClassName()) clean up resources when stack objects exit scope or heap objects are deleted."
  },
  {
    "id": "oop-cd-05",
    "category": "oop",
    "topic": "Constructors & Destructors",
    "difficulty": "medium",
    "question": "What is a 'Copy Constructor' in C++?",
    "options": [
      "A constructor of the form ClassName(const ClassName &other) used to initialize a new object as a copy of an existing object",
      "A tool that clones files",
      "A constructor that takes two arguments",
      "A method that copies pointers"
    ],
    "correctAnswer": 0,
    "explanation": "Copy constructors handle object initialization from another instance of the same class."
  },
  {
    "id": "oop-cd-06",
    "category": "oop",
    "topic": "Constructors & Destructors",
    "difficulty": "medium",
    "question": "What is the critical difference between a 'Shallow Copy' and a 'Deep Copy'?",
    "options": [
      "A shallow copy copies raw pointer addresses sharing heap resources; a deep copy allocates new heap memory and duplicates the underlying data",
      "Shallow copies only copy numbers",
      "Deep copies use stack memory only",
      "There is no difference in memory"
    ],
    "correctAnswer": 0,
    "explanation": "Shallow copying pointers leads to double-free bugs; deep copying creates an independent duplicate of dynamically allocated data."
  },
  {
    "id": "oop-cd-07",
    "category": "oop",
    "topic": "Constructors & Destructors",
    "difficulty": "medium",
    "question": "Why should base class destructors almost always be declared 'virtual' in C++?",
    "options": [
      "To ensure that deleting a derived object via a base class pointer invokes the derived class destructor first, preventing memory leaks",
      "To make destruction faster",
      "C++ enforces virtual destructors by law",
      "To allow objects to be created without constructors"
    ],
    "correctAnswer": 0,
    "explanation": "Without a virtual destructor, deleting a Derived instance via Base* only invokes ~Base(), leaking Derived heap resources."
  },
  {
    "id": "oop-cd-08",
    "category": "oop",
    "topic": "Constructors & Destructors",
    "difficulty": "medium",
    "question": "Does Java have Destructors like C++?",
    "options": [
      "No, Java relies on automatic Garbage Collection, though it historically had finalize() (now deprecated) and Cleaner/AutoCloseable",
      "Yes, Java has destructors starting with ~",
      "Yes, Java destructors are called automatically every minute",
      "Java has no memory management"
    ],
    "correctAnswer": 0,
    "explanation": "Java manages heap memory with GC and uses try-with-resources (AutoCloseable) for deterministic resource cleanup."
  },
  {
    "id": "oop-cd-09",
    "category": "oop",
    "topic": "Constructors & Destructors",
    "difficulty": "hard",
    "question": "What is a 'Private Constructor' used for?",
    "options": [
      "Preventing direct instantiation from external code, commonly used in Singleton and Factory patterns or utility classes",
      "Creating objects faster",
      "A constructor that cannot be compiled",
      "A constructor that runs in kernel mode"
    ],
    "correctAnswer": 0,
    "explanation": "Private constructors restrict instantiation to static factory methods within the class."
  },
  {
    "id": "oop-cd-10",
    "category": "oop",
    "topic": "Constructors & Destructors",
    "difficulty": "hard",
    "question": "In C++11, what is a 'Move Constructor' (ClassName(ClassName &&other))?",
    "options": [
      "Transfers ownership of heap resources from an rvalue temporary object to the new object without expensive deep copying",
      "A constructor that moves code to another file",
      "A constructor that runs on the GPU",
      "A constructor that animates graphics"
    ],
    "correctAnswer": 0,
    "explanation": "Move semantics steal pointers from expiring temporary objects in O(1) time, eliminating redundant deep copies."
  },
  {
    "id": "oop-ovo-01",
    "category": "oop",
    "topic": "Overloading vs Overriding",
    "difficulty": "easy",
    "question": "What is the fundamental difference between Method Overloading and Method Overriding?",
    "options": [
      "Overloading occurs in the same class with identical names and different parameters (compile-time); Overriding occurs across inheritance hierarchies with identical signatures (runtime)",
      "Overloading is for variables; Overriding is for classes",
      "Overriding happens at compile time; Overloading at runtime",
      "They are identical in functionality"
    ],
    "correctAnswer": 0,
    "explanation": "Overloading differentiates methods in one class by signature; overriding replaces a parent method's behavior in a subclass."
  },
  {
    "id": "oop-ovo-02",
    "category": "oop",
    "topic": "Overloading vs Overriding",
    "difficulty": "easy",
    "question": "Can you overload a method in Java or C++ solely by changing its return type?",
    "options": [
      "No, parameter signatures (types, counts, or order) must differ; return type alone is insufficient",
      "Yes, return type is the primary discriminator",
      "Only if the method is static",
      "Only if the return type is void"
    ],
    "correctAnswer": 0,
    "explanation": "The compiler cannot determine which method to call if signatures are identical and return values are ignored."
  },
  {
    "id": "oop-ovo-03",
    "category": "oop",
    "topic": "Overloading vs Overriding",
    "difficulty": "easy",
    "question": "In Method Overriding, can a subclass method reduce the visibility of the overridden parent method (e.g. from public to private)?",
    "options": [
      "No, a subclass cannot assign weaker access privileges than the superclass method",
      "Yes, subclasses can restrict visibility arbitrarily",
      "Only in C++, not in Java",
      "Only if the method is abstract"
    ],
    "correctAnswer": 0,
    "explanation": "Subclasses cannot weaken access permissions because doing so would violate Liskov Substitution Principle."
  },
  {
    "id": "oop-ovo-04",
    "category": "oop",
    "topic": "Overloading vs Overriding",
    "difficulty": "easy",
    "question": "Can 'final' methods in Java be overridden by subclasses?",
    "options": [
      "No, the 'final' keyword explicitly prevents method overriding",
      "Yes, final methods can be overridden if marked public",
      "Only in the same package",
      "Only once"
    ],
    "correctAnswer": 0,
    "explanation": "In Java, marking a method 'final' prevents subclasses from altering its implementation."
  },
  {
    "id": "oop-ovo-05",
    "category": "oop",
    "topic": "Overloading vs Overriding",
    "difficulty": "medium",
    "question": "What is 'covariation of return types' in method overriding (supported in modern C++ and Java)?",
    "options": [
      "An overriding subclass method may return a more specific derived type than the return type declared in the superclass method",
      "Return types must be converted to void",
      "Return types can change from int to string",
      "Overridden methods cannot return objects"
    ],
    "correctAnswer": 0,
    "explanation": "Covariant return types allow a subclass method to return a subtype (e.g. Cat instead of Animal) while safely overriding."
  },
  {
    "id": "oop-ovo-06",
    "category": "oop",
    "topic": "Overloading vs Overriding",
    "difficulty": "medium",
    "question": "Can constructors be overridden in OOP?",
    "options": [
      "No, constructors cannot be overridden because they are not inherited by subclasses",
      "Yes, constructors override like normal methods",
      "Only default constructors can be overridden",
      "Only in Python"
    ],
    "correctAnswer": 0,
    "explanation": "Constructors belong specifically to their defining class and cannot be inherited or overridden."
  },
  {
    "id": "oop-ovo-07",
    "category": "oop",
    "topic": "Overloading vs Overriding",
    "difficulty": "medium",
    "question": "Can private methods in a superclass be overridden by a subclass in Java?",
    "options": [
      "No, private methods are not visible to subclasses and therefore cannot be overridden (re-declaring one merely creates a new unrelated method)",
      "Yes, private methods are overridden polymorphically",
      "Only if declared protected",
      "Only with the @Override annotation"
    ],
    "correctAnswer": 0,
    "explanation": "Subclasses cannot see private methods; defining an identical signature in a child class creates an independent method."
  },
  {
    "id": "oop-ovo-08",
    "category": "oop",
    "topic": "Overloading vs Overriding",
    "difficulty": "medium",
    "question": "What happens if a derived class in C++ overloads a method name that exists in the base class without using 'using Base::method;'?",
    "options": [
      "The derived class method hides all overloads of that name in the base class (Name Hiding)",
      "All base overloads are automatically inherited",
      "A compile-time error occurs immediately",
      "The base class method is deleted"
    ],
    "correctAnswer": 0,
    "explanation": "In C++, declaring a method in a derived class hides all base class methods sharing that name unless explicitly unhidden."
  },
  {
    "id": "oop-ovo-09",
    "category": "oop",
    "topic": "Overloading vs Overriding",
    "difficulty": "hard",
    "question": "In Java, what occurs if an overridden method throws a checked exception that is NOT declared in the superclass method?",
    "options": [
      "A compile error occurs; overridden methods cannot throw broader or new checked exceptions than the superclass method",
      "The exception is ignored",
      "The program converts it to a runtime exception",
      "The compiler deletes the method"
    ],
    "correctAnswer": 0,
    "explanation": "Overriding methods can only throw narrower exceptions or subtypes of declared exceptions to preserve caller safety."
  },
  {
    "id": "oop-ovo-10",
    "category": "oop",
    "topic": "Overloading vs Overriding",
    "difficulty": "hard",
    "question": "What is the performance difference between calling an overloaded method vs an overridden virtual method in C++?",
    "options": [
      "Overloaded method calls are direct function calls resolved at compile time with zero overhead; virtual overridden calls require an indirect pointer dereference through the vtable",
      "Virtual methods are always faster",
      "Overloaded methods require runtime reflection",
      "There is no performance difference"
    ],
    "correctAnswer": 0,
    "explanation": "Virtual dispatch incurs pointer indirection (vptr -> vtable -> method address) and inhibits compiler inlining."
  },
  {
    "id": "oop-vf-01",
    "category": "oop",
    "topic": "Virtual Functions",
    "difficulty": "easy",
    "question": "What is a 'virtual function' in C++?",
    "options": [
      "A member function in a base class declared with the 'virtual' keyword that can be overridden in derived classes and resolved dynamically via runtime dispatch",
      "A function that exists only in documentation",
      "A function that runs in virtual memory",
      "A function that cannot take parameters"
    ],
    "correctAnswer": 0,
    "explanation": "Virtual functions signal to the C++ compiler to bind calls dynamically at runtime rather than statically at compile time."
  },
  {
    "id": "oop-vf-02",
    "category": "oop",
    "topic": "Virtual Functions",
    "difficulty": "easy",
    "question": "Are methods in Java virtual by default?",
    "options": [
      "Yes, all non-static, non-final, non-private methods in Java are virtual by default",
      "No, methods must be marked with the 'virtual' keyword in Java",
      "Only abstract methods are virtual in Java",
      "Java has no virtual methods"
    ],
    "correctAnswer": 0,
    "explanation": "Unlike C++, Java methods use dynamic dispatch by default unless explicitly prevented with 'final' or 'static'."
  },
  {
    "id": "oop-vf-03",
    "category": "oop",
    "topic": "Virtual Functions",
    "difficulty": "easy",
    "question": "What is the hidden pointer inserted by the C++ compiler into every object of a class containing virtual functions?",
    "options": [
      "vptr (Virtual Table Pointer)",
      "fptr (Function Pointer)",
      "heap_ptr",
      "this_ptr"
    ],
    "correctAnswer": 0,
    "explanation": "The compiler injects a hidden vptr pointing to the class's vtable to enable dynamic dispatch."
  },
  {
    "id": "oop-vf-04",
    "category": "oop",
    "topic": "Virtual Functions",
    "difficulty": "easy",
    "question": "Can a constructor be declared 'virtual' in C++?",
    "options": [
      "No, constructors cannot be virtual because an object's vtable pointer is not initialized until its constructor executes",
      "Yes, all constructors should be virtual",
      "Only copy constructors can be virtual",
      "Only in C++20"
    ],
    "correctAnswer": 0,
    "explanation": "You cannot invoke a virtual constructor because the object's type and vptr do not yet exist in memory."
  },
  {
    "id": "oop-vf-05",
    "category": "oop",
    "topic": "Virtual Functions",
    "difficulty": "medium",
    "question": "Can a static member function be declared 'virtual' in C++?",
    "options": [
      "No, static functions belong to the class, not an object instance, and lack the 'this' pointer required for vtable dispatch",
      "Yes, static virtual functions are common",
      "Only if marked public",
      "Only in abstract classes"
    ],
    "correctAnswer": 0,
    "explanation": "Virtual dispatch depends on instance-level vptr dereferencing; static functions operate without instance context."
  },
  {
    "id": "oop-vf-06",
    "category": "oop",
    "topic": "Virtual Functions",
    "difficulty": "medium",
    "question": "What is the 'vtable' memory cost per polymorphic class and per object instance in C++?",
    "options": [
      "One vtable per class stored in read-only memory, plus one vptr per object instance (typically 8 bytes on 64-bit systems)",
      "One vtable per object instance",
      "100 bytes per method",
      "Zero memory overhead"
    ],
    "correctAnswer": 0,
    "explanation": "The vtable structure is shared class-wide in text/data space; each instance pays an 8-byte pointer overhead."
  },
  {
    "id": "oop-vf-07",
    "category": "oop",
    "topic": "Virtual Functions",
    "difficulty": "medium",
    "question": "What does the C++11 'override' specifier do when appended to a virtual function declaration?",
    "options": [
      "Explicitly instructs the compiler to verify that the method overrides a virtual function in a base class, catching signature typos at compile time",
      "Forces the method to be inline",
      "Prevents subclasses from overriding",
      "Makes the function pure virtual"
    ],
    "correctAnswer": 0,
    "explanation": "The 'override' keyword prevents silent bugs where minor signature differences inadvertently create new methods."
  },
  {
    "id": "oop-vf-08",
    "category": "oop",
    "topic": "Virtual Functions",
    "difficulty": "medium",
    "question": "What does the C++11 'final' specifier do when applied to a virtual function?",
    "options": [
      "Prevents derived classes from overriding that virtual function any further down the inheritance chain",
      "Deletes the function from memory",
      "Makes the function run last",
      "Prevents compilation"
    ],
    "correctAnswer": 0,
    "explanation": "'final' seals the virtual method, prohibiting any further overriding in subsequent subclasses."
  },
  {
    "id": "oop-vf-09",
    "category": "oop",
    "topic": "Virtual Functions",
    "difficulty": "hard",
    "question": "What happens if a virtual function is called inside a Base class constructor in C++?",
    "options": [
      "Early binding occurs: the Base class version of the virtual function is invoked because the Derived object has not been constructed yet",
      "The Derived class method is invoked",
      "A runtime segmentation fault occurs",
      "The program deadlocks"
    ],
    "correctAnswer": 0,
    "explanation": "In C++, dynamic dispatch does not descend into unconstructed derived classes during base constructor execution."
  },
  {
    "id": "oop-vf-10",
    "category": "oop",
    "topic": "Virtual Functions",
    "difficulty": "hard",
    "question": "What is a 'pure virtual destructor' in C++ and can it have a body?",
    "options": [
      "A destructor declared as 'virtual ~Base() = 0;' which makes the class abstract, but it MUST still provide a function definition body outside the class",
      "It cannot have a body under any circumstances",
      "It deletes all objects automatically",
      "It prevents derived classes from being deleted"
    ],
    "correctAnswer": 0,
    "explanation": "Even pure virtual destructors require a body definition because derived destructors implicitly call ~Base() during unwinding."
  },
  {
    "id": "oop-iac-01",
    "category": "oop",
    "topic": "Interfaces / Abstract Classes",
    "difficulty": "easy",
    "question": "What is an Interface in OOP?",
    "options": [
      "A contract specifying a set of method signatures that implementing classes must fulfill, without specifying internal state",
      "A concrete class with implemented code",
      "A graphical user interface window",
      "A private header file"
    ],
    "correctAnswer": 0,
    "explanation": "Interfaces define pure capability contracts ('CAN-DO' relationships) decoupled from concrete implementation."
  },
  {
    "id": "oop-iac-02",
    "category": "oop",
    "topic": "Interfaces / Abstract Classes",
    "difficulty": "easy",
    "question": "In Java, how many interfaces can a single class implement?",
    "options": [
      "Multiple interfaces (unlimited)",
      "Only one interface",
      "At most two interfaces",
      "None if it extends a class"
    ],
    "correctAnswer": 0,
    "explanation": "Java supports multiple inheritance of type through multiple interface implementation."
  },
  {
    "id": "oop-iac-03",
    "category": "oop",
    "topic": "Interfaces / Abstract Classes",
    "difficulty": "easy",
    "question": "What is the primary architectural difference between an Abstract Class and an Interface?",
    "options": [
      "An abstract class can maintain mutable instance state and concrete helper methods; an interface traditionally defines only stateless public contracts",
      "Interfaces can have private variables; abstract classes cannot",
      "Abstract classes can be instantiated; interfaces cannot",
      "There is no difference in modern languages"
    ],
    "correctAnswer": 0,
    "explanation": "Abstract classes represent core identity and shared state; interfaces represent polymorphic contracts."
  },
  {
    "id": "oop-iac-04",
    "category": "oop",
    "topic": "Interfaces / Abstract Classes",
    "difficulty": "easy",
    "question": "When should you prefer an Abstract Class over an Interface?",
    "options": [
      "When multiple related classes share common state, member variables, or concrete template method workflows",
      "When you want multiple inheritance",
      "When you have no code to share",
      "When writing unit tests"
    ],
    "correctAnswer": 0,
    "explanation": "Use abstract classes for closely related hierarchies sharing code and non-static member variables."
  },
  {
    "id": "oop-iac-05",
    "category": "oop",
    "topic": "Interfaces / Abstract Classes",
    "difficulty": "medium",
    "question": "What feature was introduced to Java 8 interfaces allowing backwards-compatible method additions?",
    "options": [
      "Default methods (using the 'default' keyword)",
      "Protected variables",
      "Private constructors",
      "Destructors"
    ],
    "correctAnswer": 0,
    "explanation": "Java 8 added 'default' methods with concrete implementations to evolve existing interfaces (e.g. forEach on Collections) without breaking existing implementations."
  },
  {
    "id": "oop-iac-06",
    "category": "oop",
    "topic": "Interfaces / Abstract Classes",
    "difficulty": "medium",
    "question": "What is a 'Functional Interface' in Java (or Single Abstract Method / SAM)?",
    "options": [
      "An interface containing exactly one abstract method, eligible to be implemented concisely via lambda expressions",
      "An interface with only static methods",
      "An interface that has no methods",
      "An interface used only in math"
    ],
    "correctAnswer": 0,
    "explanation": "Functional interfaces (annotated with @FunctionalInterface, like Runnable or Comparator) can be implemented via lambdas."
  },
  {
    "id": "oop-iac-07",
    "category": "oop",
    "topic": "Interfaces / Abstract Classes",
    "difficulty": "medium",
    "question": "What is a 'Marker Interface' in Java (e.g. Serializable, Cloneable)?",
    "options": [
      "An interface with zero methods and zero constants, used to tag or mark classes for special runtime metadata processing by JVM/frameworks",
      "An interface that draws shapes",
      "An interface that logs memory",
      "A deprecated feature removed in Java 17"
    ],
    "correctAnswer": 0,
    "explanation": "Marker interfaces communicate type metadata to compilers or runtimes without imposing method contracts."
  },
  {
    "id": "oop-iac-08",
    "category": "oop",
    "topic": "Interfaces / Abstract Classes",
    "difficulty": "medium",
    "question": "How does C++ achieve the equivalent of an Interface?",
    "options": [
      "By declaring an Abstract Class consisting entirely of pure virtual functions and a virtual destructor, with no member variables",
      "Using the 'interface' keyword",
      "Using macros",
      "Using template structs"
    ],
    "correctAnswer": 0,
    "explanation": "C++ lacks a dedicated 'interface' keyword; pure abstract classes serve as interface contracts."
  },
  {
    "id": "oop-iac-09",
    "category": "oop",
    "topic": "Interfaces / Abstract Classes",
    "difficulty": "hard",
    "question": "What happens if a class implements two Java 8 interfaces that both provide conflicting default methods with the exact same signature?",
    "options": [
      "The compiler generates a conflict error, requiring the implementing class to explicitly override and resolve the method",
      "The compiler picks the first interface alphabetically",
      "The JVM crashes at runtime",
      "Both methods are executed sequentially"
    ],
    "correctAnswer": 0,
    "explanation": "Java forces the developer to resolve diamond default method collisions explicitly (e.g., InterfaceA.super.method())."
  },
  {
    "id": "oop-iac-10",
    "category": "oop",
    "topic": "Interfaces / Abstract Classes",
    "difficulty": "hard",
    "question": "What is the 'Interface Segregation Principle' (ISP) from SOLID?",
    "options": [
      "Clients should not be forced to depend upon interfaces that have methods they do not use; split fat interfaces into cohesive, focused ones",
      "All interfaces must be in separate files",
      "Interfaces must only have one method",
      "Interfaces should be private"
    ],
    "correctAnswer": 0,
    "explanation": "ISP advocates for small, role-specific interfaces over massive monolithic contracts."
  },
  {
    "id": "oop-sld-01",
    "category": "oop",
    "topic": "SOLID Fundamentals",
    "difficulty": "easy",
    "question": "What does the 'S' stand for in SOLID principles?",
    "options": [
      "Single Responsibility Principle (SRP)",
      "Software Reliability Principle",
      "Simple Code Principle",
      "Subclass Replacement Principle"
    ],
    "correctAnswer": 0,
    "explanation": "SRP states that a class should have one, and only one, reason to change."
  },
  {
    "id": "oop-sld-02",
    "category": "oop",
    "topic": "SOLID Fundamentals",
    "difficulty": "easy",
    "question": "What is the core definition of the Single Responsibility Principle (SRP)?",
    "options": [
      "A module or class should be responsible to one, and only one, actor/stakeholder and have a single cohesive responsibility",
      "A function can only have one line of code",
      "A class can only have one method",
      "A project can only have one developer"
    ],
    "correctAnswer": 0,
    "explanation": "SRP ensures that distinct business requirements (e.g. data persistence vs report rendering) do not pollute the same class."
  },
  {
    "id": "oop-sld-03",
    "category": "oop",
    "topic": "SOLID Fundamentals",
    "difficulty": "easy",
    "question": "What does the 'O' stand for in SOLID?",
    "options": [
      "Open/Closed Principle (OCP)",
      "Object Creation Principle",
      "Operational Completeness Principle",
      "Overloading Control Principle"
    ],
    "correctAnswer": 0,
    "explanation": "OCP states that software entities should be open for extension, but closed for modification."
  },
  {
    "id": "oop-sld-04",
    "category": "oop",
    "topic": "SOLID Fundamentals",
    "difficulty": "easy",
    "question": "How is the Open/Closed Principle (OCP) typically implemented in practice?",
    "options": [
      "Using polymorphism, interfaces, and strategy patterns so new behaviors can be added via new classes without editing existing code",
      "Locking files with read-only file permissions",
      "Writing all code inside a final class",
      "Never updating dependencies"
    ],
    "correctAnswer": 0,
    "explanation": "Polymorphic abstractions allow adding new payment gateways or algorithms without modifying tested core logic."
  },
  {
    "id": "oop-sld-05",
    "category": "oop",
    "topic": "SOLID Fundamentals",
    "difficulty": "medium",
    "question": "What does the 'L' stand for in SOLID?",
    "options": [
      "Liskov Substitution Principle (LSP)",
      "Linear Scaling Principle",
      "Logical Structure Principle",
      "Lazy Initialization Principle"
    ],
    "correctAnswer": 0,
    "explanation": "LSP: Subtypes must be substitutable for their base types without altering application correctness."
  },
  {
    "id": "oop-sld-06",
    "category": "oop",
    "topic": "SOLID Fundamentals",
    "difficulty": "medium",
    "question": "Which classic design violation breaks the Liskov Substitution Principle?",
    "options": [
      "Square inheriting from Rectangle where setting width modifies height, violating the client expectation of independent dimensions",
      "Dog inheriting from Animal",
      "Car inheriting from Vehicle",
      "ArrayList implementing List"
    ],
    "correctAnswer": 0,
    "explanation": "Square breaks the post-conditions of Rectangle.setWidth(), proving that mathematical subtyping does not always map to behavioral subtyping."
  },
  {
    "id": "oop-sld-07",
    "category": "oop",
    "topic": "SOLID Fundamentals",
    "difficulty": "medium",
    "question": "What does the 'I' stand for in SOLID?",
    "options": [
      "Interface Segregation Principle (ISP)",
      "Inheritance Scaling Principle",
      "Instantiation Safety Principle",
      "Identity State Principle"
    ],
    "correctAnswer": 0,
    "explanation": "ISP mandates creating specific, lean interfaces rather than forcing clients to implement fat, unused methods."
  },
  {
    "id": "oop-sld-08",
    "category": "oop",
    "topic": "SOLID Fundamentals",
    "difficulty": "medium",
    "question": "What does the 'D' stand for in SOLID?",
    "options": [
      "Dependency Inversion Principle (DIP)",
      "Direct Implementation Principle",
      "Dynamic Inheritance Principle",
      "Data Integrity Principle"
    ],
    "correctAnswer": 0,
    "explanation": "DIP: High-level modules should not depend on low-level modules; both should depend on abstractions."
  },
  {
    "id": "oop-sld-09",
    "category": "oop",
    "topic": "SOLID Fundamentals",
    "difficulty": "hard",
    "question": "How does 'Dependency Injection' (DI) relate to the Dependency Inversion Principle (DIP)?",
    "options": [
      "DI is a software design technique where dependencies are injected into an object (via constructor or setter) rather than created internally with 'new'",
      "DI is a compile-time error",
      "DI requires all classes to be static",
      "DI is only for web applications"
    ],
    "correctAnswer": 0,
    "explanation": "Dependency Injection is the operational implementation mechanism that realizes Dependency Inversion."
  },
  {
    "id": "oop-sld-10",
    "category": "oop",
    "topic": "SOLID Fundamentals",
    "difficulty": "hard",
    "question": "A class violates SOLID by handling user authentication, sending promotional emails, and generating PDF invoices. Which principle is violated first?",
    "options": [
      "Single Responsibility Principle (SRP)",
      "Open/Closed Principle",
      "Liskov Substitution Principle",
      "Interface Segregation Principle"
    ],
    "correctAnswer": 0,
    "explanation": "Handling three disparate domain responsibilities (security, marketing communication, and billing) directly violates SRP."
  },
  {
    "id": "oop-cvi-01",
    "category": "oop",
    "topic": "Composition vs Inheritance",
    "difficulty": "easy",
    "question": "What is the famous design maxim regarding Composition and Inheritance in the Gang of Four (GoF) book?",
    "options": [
      "'Favor object composition over class inheritance'",
      "'Always use inheritance when possible'",
      "'Never use composition'",
      "'Inheritance is faster than composition'"
    ],
    "correctAnswer": 0,
    "explanation": "The GoF design patterns emphasize favoring composition over inheritance to maintain architectural flexibility."
  },
  {
    "id": "oop-cvi-02",
    "category": "oop",
    "topic": "Composition vs Inheritance",
    "difficulty": "easy",
    "question": "What is the relationship described by Composition vs Inheritance?",
    "options": [
      "Composition represents a 'HAS-A' relationship; Inheritance represents an 'IS-A' relationship",
      "Composition is 'IS-A'; Inheritance is 'HAS-A'",
      "Both represent 'IS-A'",
      "Both represent 'HAS-A'"
    ],
    "correctAnswer": 0,
    "explanation": "A Car HAS-A Engine (composition); a Dog IS-A Mammal (inheritance)."
  },
  {
    "id": "oop-cvi-03",
    "category": "oop",
    "topic": "Composition vs Inheritance",
    "difficulty": "easy",
    "question": "What is 'tight coupling' created by deep class inheritance hierarchies?",
    "options": [
      "Derived classes are tightly bound to base class implementation details; changes in the base class can unpredictably break derived classes (Fragile Base Class problem)",
      "Fast compilation speed",
      "Memory savings on the stack",
      "Subclasses that cannot be compiled"
    ],
    "correctAnswer": 0,
    "explanation": "Inheritance exposes internal base class implementation to subclasses ('white-box reuse'), creating fragility."
  },
  {
    "id": "oop-cvi-04",
    "category": "oop",
    "topic": "Composition vs Inheritance",
    "difficulty": "easy",
    "question": "What is an example of Composition in code?",
    "options": [
      "Class Car containing a private Engine engine = new Engine(); member variable",
      "Class Car extends Vehicle",
      "Class Car implements Drivable",
      "Class Car {}"
    ],
    "correctAnswer": 0,
    "explanation": "Holding an instance reference to Engine inside Car is the definition of composition."
  },
  {
    "id": "oop-cvi-05",
    "category": "oop",
    "topic": "Composition vs Inheritance",
    "difficulty": "medium",
    "question": "What is the difference between 'Composition' and 'Aggregation' in UML modeling?",
    "options": [
      "In Composition, the child object cannot exist independently of the parent (strong lifecycle ownership); in Aggregation, the child can exist independently (weak association)",
      "Aggregation deletes objects automatically; composition does not",
      "Composition is only for interfaces",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "A House and its Rooms is Composition (deleting house destroys rooms); a Department and its Professors is Aggregation."
  },
  {
    "id": "oop-cvi-06",
    "category": "oop",
    "topic": "Composition vs Inheritance",
    "difficulty": "medium",
    "question": "Why is Composition considered 'black-box reuse' while Inheritance is 'white-box reuse'?",
    "options": [
      "With composition, the outer object interacts only with the well-defined public interface of the composed object without knowing its internals",
      "Composition uses black background themes",
      "Inheritance hides all code",
      "Composition cannot be tested"
    ],
    "correctAnswer": 0,
    "explanation": "Composition respects encapsulation boundaries by using public interfaces of components."
  },
  {
    "id": "oop-cvi-07",
    "category": "oop",
    "topic": "Composition vs Inheritance",
    "difficulty": "medium",
    "question": "How does Composition enable dynamic runtime behavior changes that Inheritance cannot?",
    "options": [
      "Composed strategies or algorithms can be swapped at runtime by injecting a different implementation, whereas inheritance binds types statically at compile time",
      "Composition rewrites bytecode at runtime",
      "Inheritance deletes objects on the fly",
      "Composition uses multiple threads"
    ],
    "correctAnswer": 0,
    "explanation": "You can change a Car's engine from ElectricEngine to GasEngine at runtime via composition (Strategy Pattern)."
  },
  {
    "id": "oop-cvi-08",
    "category": "oop",
    "topic": "Composition vs Inheritance",
    "difficulty": "medium",
    "question": "What is the 'Fragile Base Class' problem in inheritance?",
    "options": [
      "A seemingly safe modification to a base class unintentionally breaks the functional assumptions or behaviors of derived classes",
      "A base class with syntax errors",
      "A base class that uses too much RAM",
      "A class that has no constructors"
    ],
    "correctAnswer": 0,
    "explanation": "Because subclasses depend on internal base execution flow, modifying base methods can cause cascading derived errors."
  },
  {
    "id": "oop-cvi-09",
    "category": "oop",
    "topic": "Composition vs Inheritance",
    "difficulty": "hard",
    "question": "What design pattern relies directly on composition to attach new responsibilities to objects dynamically without subclassing?",
    "options": [
      "Decorator Pattern",
      "Singleton Pattern",
      "Factory Pattern",
      "Abstract Factory Pattern"
    ],
    "correctAnswer": 0,
    "explanation": "The Decorator Pattern wraps an existing object in a composite shell to augment behavior dynamically."
  },
  {
    "id": "oop-cvi-10",
    "category": "oop",
    "topic": "Composition vs Inheritance",
    "difficulty": "hard",
    "question": "When is Inheritance actually the correct choice over Composition?",
    "options": [
      "When a genuine, invariant 'IS-A' relationship exists and the derived class is a true behavioral subtype honoring Liskov Substitution",
      "When you want to save typing 5 lines of code",
      "Whenever two classes share any single variable",
      "Never, inheritance should be banned"
    ],
    "correctAnswer": 0,
    "explanation": "Inheritance is appropriate when true subtyping and polymorphic substitutability are required across the entire domain lifecycle."
  },
  {
    "id": "oop-scn-01",
    "category": "oop",
    "topic": "Common OOP Interview Scenarios",
    "difficulty": "easy",
    "question": "How would you design a thread-safe Singleton in Java?",
    "options": [
      "Using Double-Checked Locking with a 'volatile' instance variable, or using an Enum / Bill Pugh static inner holder class",
      "Making all methods in the class synchronized",
      "Declaring the instance as a local variable",
      "Using a public constructor with a while loop"
    ],
    "correctAnswer": 0,
    "explanation": "Double-checked locking with volatile ensures lazy loading with minimal synchronization overhead; Enum is inherently thread-safe."
  },
  {
    "id": "oop-scn-02",
    "category": "oop",
    "topic": "Common OOP Interview Scenarios",
    "difficulty": "easy",
    "question": "In an interview, you are asked to design a Parking Lot system using OOP. What are the core classes?",
    "options": [
      "ParkingLot, ParkingSpot (Compact, Large, Handicapped), Vehicle (Car, Bike, Truck), Ticket, and Payment",
      "Only one giant class called Parking",
      "Car and Road",
      "Database and Server"
    ],
    "correctAnswer": 0,
    "explanation": "Clean domain decomposition defines entities (Vehicle, Spot, Lot) and transactional models (Ticket, Payment)."
  },
  {
    "id": "oop-scn-03",
    "category": "oop",
    "topic": "Common OOP Interview Scenarios",
    "difficulty": "easy",
    "question": "What design pattern would you recommend for an application that must support multiple notification channels (Email, SMS, WhatsApp, Slack)?",
    "options": [
      "Strategy Pattern (or Factory Pattern for instantiating the notification strategy)",
      "Singleton Pattern",
      "Prototype Pattern",
      "Flyweight Pattern"
    ],
    "correctAnswer": 0,
    "explanation": "A NotificationStrategy interface with EmailNotification, SMSNotification, etc., encapsulates channel-specific dispatch."
  },
  {
    "id": "oop-scn-04",
    "category": "oop",
    "topic": "Common OOP Interview Scenarios",
    "difficulty": "easy",
    "question": "What is the Factory Method design pattern?",
    "options": [
      "Defines an interface for creating an object, but lets subclasses decide which concrete class to instantiate",
      "A factory that manufactures computer hardware",
      "A method that runs in an industrial factory",
      "A constructor that takes 10 parameters"
    ],
    "correctAnswer": 0,
    "explanation": "Factory Method delegates instantiation logic away from client code to specialized creator classes."
  },
  {
    "id": "oop-scn-05",
    "category": "oop",
    "topic": "Common OOP Interview Scenarios",
    "difficulty": "medium",
    "question": "How would you design an elevator control system in OOP?",
    "options": [
      "ElevatorController, ElevatorCar, Direction (Enum), Request/Button, and Dispatcher algorithms (e.g. SCAN/LOOK)",
      "A single loop that goes up and down",
      "Building and Door",
      "User and Floor only"
    ],
    "correctAnswer": 0,
    "explanation": "Elevator systems separate state (Car, Direction, Floor), inputs (Requests), and dispatching algorithms."
  },
  {
    "id": "oop-scn-06",
    "category": "oop",
    "topic": "Common OOP Interview Scenarios",
    "difficulty": "medium",
    "question": "What pattern is best suited for building an undo/redo mechanism in a text editor?",
    "options": [
      "Command Pattern (encapsulating actions as command objects with execute() and undo() methods)",
      "Observer Pattern",
      "Adapter Pattern",
      "Proxy Pattern"
    ],
    "correctAnswer": 0,
    "explanation": "The Command pattern encapsulates requests as objects, maintaining an undo stack of historical command objects."
  },
  {
    "id": "oop-scn-07",
    "category": "oop",
    "topic": "Common OOP Interview Scenarios",
    "difficulty": "medium",
    "question": "What is the Observer Pattern and where is it used?",
    "options": [
      "A one-to-many dependency where when one subject changes state, all registered observers are notified automatically (e.g. event listeners, pub/sub)",
      "A pattern that spies on user passwords",
      "A pattern for compiling code",
      "A pattern that monitors CPU temperature"
    ],
    "correctAnswer": 0,
    "explanation": "Observer decouples event sources from consumers, powering UI event loops and reactive message streams."
  },
  {
    "id": "oop-scn-08",
    "category": "oop",
    "topic": "Common OOP Interview Scenarios",
    "difficulty": "medium",
    "question": "How do you model payment processing in an e-commerce platform so adding PayPal, Stripe, or Apple Pay requires no changes to the checkout service?",
    "options": [
      "Define a PaymentGateway interface with a processPayment() method; inject concrete implementations via dependency injection (Open/Closed Principle)",
      "Write an if-else chain with 50 conditions inside the Checkout class",
      "Create separate checkout websites for each payment method",
      "Ask the user to wire money manually"
    ],
    "correctAnswer": 0,
    "explanation": "Programming to a PaymentGateway abstraction isolates the Checkout service from vendor API differences."
  },
  {
    "id": "oop-scn-09",
    "category": "oop",
    "topic": "Common OOP Interview Scenarios",
    "difficulty": "hard",
    "question": "What is the Adapter Pattern and when is it used in enterprise refactoring?",
    "options": [
      "Converts the incompatible interface of an existing legacy class into another interface expected by modern clients",
      "A hardware plug for laptop chargers",
      "A pattern that creates database tables",
      "A pattern that deletes unused code"
    ],
    "correctAnswer": 0,
    "explanation": "The Adapter acts as a translation wrapper bridging legacy systems with updated service interfaces."
  },
  {
    "id": "oop-scn-10",
    "category": "oop",
    "topic": "Common OOP Interview Scenarios",
    "difficulty": "hard",
    "question": "Why would you choose the Builder Pattern over a telescoping constructor with 8 optional parameters?",
    "options": [
      "Prevents confusing constructor signatures with multiple identical types, improves code readability with fluent chaining, and guarantees object validity before build()",
      "Makes memory allocation 10x faster",
      "Enables multithreading automatically",
      "Compiles out all instance variables"
    ],
    "correctAnswer": 0,
    "explanation": "Builder solves the telescoping constructor antipattern by providing clear, step-by-step readable configuration."
  }
]
  };

  if (typeof window !== 'undefined') {
    window.interviewPrepData = window.interviewPrepData || {};
    window.interviewPrepData['oop'] = oopData;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = oopData;
  }
})();
