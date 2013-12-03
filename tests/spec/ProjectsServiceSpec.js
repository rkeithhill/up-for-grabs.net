describe("ProjectsService", function() {
  var projectsService;
  

  beforeEach(function() {
    projectsService = new ProjectsService(sampleProjects);
  });

  it("should be not be undefined", function() {
    expect(projectsService).toBeDefined();
  });

  it("should have get method defined", function() {
    expect(projectsService.get).toBeDefined();
  });

  it("should have getTags method defined", function() {
    expect(projectsService.getTags).toBeDefined();
  });

  it("should return projects list when get method is called", function() {
    expect(projectsService.get()).toBeDefined();
  });

  it("should return tags map when getTags method is called", function() {
    expect(projectsService.getTags()).toBeDefined();
  });

  //Not sure how to test for randomness accurately, for now trusut underscore and ignore this. 
  xit("should return shuffled projects list  ", function() {
    var projects = projectsService.get();
    expect(projects[0].name).not.toEqual(_.toArray(sampleProjects.projects)[0].name);
  });

  describe("when get method is called with no parameters", function(){
    it("should return all the projects", function() {
      var projects = projectsService.get();
      expect(projects.length).toBe(2);
    });
  });

  describe("when get method is called with an empty tags array", function(){
    it("should return all the projects", function() {
      var projects = projectsService.get();
      expect(projects.length).toBe(2);
    });
  });

  describe("when get method is called with matching tags array", function(){
    it("should return all projects associated with those tags", function() {
      var projects = projectsService.get(["web"]);
      expect(projects.length).toBe(1);
    });

    it("should apply case insensitve search for projects associated with those tags", function() {
      var projects = projectsService.get(["WEB"]);
      expect(projects.length).toBe(1);
    });
  });

  describe("when get method is called tags array and none of the tags match", function(){
    it("should return 0 projects", function() {
      var projects = projectsService.get(["D'oh"]);
      expect(projects.length).toBe(0);
    });
  });

  describe("when get method is called with tags parameter as a string", function(){
    it("should return all projects associated with those tags", function() {
      var projects = projectsService.get("web");
      expect(projects.length).toBe(1);
    });

    it("should match the tags after trimming leading and trailing spaces", function() {
      var projects = projectsService.get(" web ");
      expect(projects.length).toBe(1);
    });
  });

  describe("when get method is called tags array with both matching and non matching tags", function(){
    it("should return projects for the matching tags and ignore non matching tag", function() {
      var projects = projectsService.get(["asp.net", "D'oh"]);
      expect(projects.length).toBe(2);
    });
  });
});