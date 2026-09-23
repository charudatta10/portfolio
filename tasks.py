from invoke import task, Collection, Context


@task
def commit(ctx, message="init"):
    ctx.run("git add .")
    ctx.run(f'git commit -m "{message}"')


@task
def quit(ctx):
    print("Copyright © 2024 Charudatta")


@task
def test(ctx):
    ctx.run("python -m unittest discover -s tests")


@task
def build(ctx):
    """
    Build the portfolio using MkDocs.
    """
    ctx.run("python -m mkdocs build")


@task
def serve(ctx):
    """
    Serve the portfolio locally using MkDocs.
    """
    ctx.run("python -m mkdocs serve")


@task(default=True)
def default(ctx):
    # Get a list of tasks
    tasks = sorted(ns.tasks.keys())
    # Display tasks and prompt user
    for i, task_name in enumerate(tasks, 1):
        print(f"{i}: {task_name}")
    choice = int(input("Enter the number of your choice: "))
    ctx.run(f"invoke {tasks[choice - 1]}")


# Create a collection of tasks
ns = Collection(
    commit,
    quit,
    test,
    build,
    serve,
    default,
)
