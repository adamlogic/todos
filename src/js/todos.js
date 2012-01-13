window.Todos = Ember.Application.create();

Todos.todosController = Ember.ArrayController.create({
  content: [],

  doneCount: function() {
    return this.filterProperty('done', true).length;
  }.property('@each.done'),

  remainingCount: function() {
    return this.filterProperty('done', false).length;
  }.property('@each.done'),

  add: function(text) {
    this.pushObject({text: text, done: false});
  },

  remove: function(item) {
    this.removeObject(item);
  },

  clearCompleted: function() {
    this.filterProperty('done', true).forEach(this.removeObject, this);
  }
});

Todos.AddTodoView = Ember.TextField.extend({
  insertNewline: function(e) {
    var text = this.$().val();
    Todos.todosController.add(text);
    this.$().val('');
  }
});

Todos.TodoItemView = Ember.View.extend({
  templateName: 'todo_item_view',
  todo: 'todo',
  isDoneBinding: 'item.done',
  classNameBindings: 'isEditing:editing',
  isEditing: false,

  todoCheckboxView: Ember.View.extend({
    change: function(e) {
      var done = this.getPath('parentView.isDone');
      this.setPath('parentView.isDone', !done);
    }
  }),

  todoItemTextView: Ember.View.extend({
    doubleClick: function(e) {
      this.setPath('parentView.isEditing', true);
    }
  }),

  todoItemEditView: Ember.TextField.extend({
    insertNewline: function(e) {
      this.setPath('parentView.isEditing', false);
    }
  }),

  todoItemDestroyView: Ember.View.extend({
    click: function(e) {
      Todos.todosController.remove(this.getPath('parentView.item'));
    }
  })
});

Todos.ClearCompletedView = Ember.View.extend({
  click: function(e) {
    Todos.todosController.clearCompleted();
  }
});
