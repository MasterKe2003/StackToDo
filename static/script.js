document.addEventListener('DOMContentLoaded', function() {  
    var taskInput = document.getElementById('taskInput');  

    // 添加任务的逻辑  
    taskInput.addEventListener('keydown', function(event) {  
        if (event.key === 'Enter') {  
            event.preventDefault(); // 阻止默认的 Enter 行为  
            var task = taskInput.value;  
            fetch('/add_task', {  
                method: 'POST',  
                headers: {  
                    'Content-Type': 'application/x-www-form-urlencoded',  
                },  
                body: 'task=' + encodeURIComponent(task)  
            }).then(function(response) {  
                return response.json(); // 解析JSON响应  
            }).then(function(data) {  
                if (data.success) {  
                    taskInput.value = ''; // 清空输入框  
                    // 动态添加新任务到页面  
                    var stackContainer = document.querySelector('.stack-container .stack');  
                    var newTaskElement = document.createElement('div');  
                    newTaskElement.className = 'stack-item';  
                    newTaskElement.textContent = task;  
                    stackContainer.insertBefore(newTaskElement, stackContainer.firstChild);  
                    // 如果之前显示的是"No tasks in the stack"，移除它  
                    var emptyTaskElement = stackContainer.querySelector('.stack-item.empty');  
                    if (emptyTaskElement) {  
                        emptyTaskElement.remove();  
                    }  
                } else {  
                    alert('Failed to add task'); // 处理错误  
                }  
            }).catch(function(error) {  
                console.error('Error:', error);  
            });  
        }  
    });  

    // 删除任务的逻辑  
    document.addEventListener('keydown', function(event) {  
        if (event.key === 'Backspace' && taskInput.value === '') {  
            event.preventDefault(); // 阻止默认的 Backspace 行为  
            fetch('/delete_task', {  
                method: 'POST'  
            }).then(function(response) {  
                return response.json(); // 解析JSON响应  
            }).then(function(data) {  
                if (data.success) {  
                    // 删除页面上的第一个任务  
                    var stackContainer = document.querySelector('.stack-container .stack');  
                    var firstTaskElement = stackContainer.querySelector('.stack-item:not(.empty)');  
                    if (firstTaskElement) {  
                        firstTaskElement.remove();  
                    }  
                    // 如果没有任务了，显示"No tasks in the stack"  
                    if (stackContainer.children.length === 0) {  
                        var emptyTaskElement = document.createElement('div');  
                        emptyTaskElement.className = 'stack-item empty';  
                        emptyTaskElement.textContent = 'No tasks in the stack';  
                        stackContainer.appendChild(emptyTaskElement);  
                    }  
                } else {  
                    alert('Failed to delete task'); // 处理错误  
                }  
            }).catch(function(error) {  
                console.error('Error:', error);  
            });  
        }  
    });  
});  