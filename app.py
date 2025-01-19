from flask import Flask, render_template, request, jsonify, url_for ,redirect

app = Flask(__name__)  

# 使用列表模拟栈结构  
task_stack = []  

@app.route('/')  
def index():  
    return render_template('index.html', tasks=task_stack)  

@app.route('/add_task', methods=['POST'])  
def add_task():  
    task = request.form.get('task')  
    if task:  
        task_stack.append(task)  
        return jsonify({'success': True})  
    else:  
        return jsonify({'success': False})  

@app.route('/delete_task', methods=['POST'])  
def delete_task():  
    if task_stack:  
        task_stack.pop()  
        return jsonify({'success': True})  
    else:  
        return jsonify({'success': False})
if __name__ == '__main__':  
    app.run(port=5000,host='0.0.0.0')