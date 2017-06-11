# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue,
email, or any other method before making a change. 

Please note we have a code of conduct, please follow it in all your interactions with the project.

## Forks and Pull Requests

Development on LiMe App follows the Fork and Pull Request method popularized by GitHub:

- Every contributor has their own complete copy, called a *Fork*
- Contributors implement features or fix bugs on their own fork in a feature branch.
- When the contributor wants to integrate their changes back into the main repository,
  they will create a *Pull Request*.

Each of these steps will be discussed in turn:

#### Forking

The first thing that you will need for development, is to create a new copy of the repository to
work on.  This is known as "Forking" and is a defining characteristic of distributed
SCM systems: each person works on their own complete copy of the repository.  Git is designed to
make it trivially easy to keep these repositories in sync by passing signed revisions amongst the
individual copies.

In order to create a fork:

1. Log into GitHub and go to the [LiMeApp GitHub repository](https://github.com/libremesh/lime-app).

2. Click "Fork".  You should be redirected to a complete copy of the repository which now resides in your account.

3. On your workstation, create a clone of the Git repository:
    ```git clone git@github.com:<your-username>/lime-app.git```
    This will create yet another complete copy of the repository: one that will reside
    on your workstation.

4. Checkout the `develop` branch.
   ```git checkout develop```

### Branching

Any changes that are made to the LiMeApp code-base should be done in their own branch.  The branch
should be made from the tip of `develop`, which is the development branch.  Before starting
any piece of work, ensure that you fetch the latest upstream changes from the repository.
Doing so will ensure that you have an up-to-date copy of `develop`, that changes made by others
will not be lost, and will also reduce the chances of conflicts when it comes time to merging the
changes back to LiMeApp.

#### Branch Names

There are two key branches:

- `master`: this branch is used for releases.  Only members responsible for release management
  will merge changes into this branch, and only from the `develop` branch.

- `develop`: this branch is the working version that is currently under development.  All
    new feature branches should be made from the tip of `develop` and all PR's should have `develop`
    set as the target.

For any new feature branches, the following naming convention is recommended:

- `issue-X`: branch to work on GitHub issue X (e.g. `issue-31`).

#### General Workflow

The general workflow for branching is as follows:

1. Fetch the latest changes from `upstream` (i.e. the main repository):

   ```git fetch upstream develop```

2. Check-out you copy of develop and merge the upstream changes:

    ```git checkout develop```
    ```git merge upstream/develop```

    You now have an up-to-day copy of the `develop` branch.

3. Create a new branch for your changes:

    ```git checkout -b <branch name>```

4. Make your changes

5. Push the changes to `origin` (i.e. your fork)

    ```git push origin <branch name>```

6. Create a new Pull Request (see below).

#### Creating A Pull Request

In order to integrate your changes into the main LiMeApp repository, you will
need to create a *Pull Request* in GitHub.

1. Log into GitHub and go to your fork of LiMeApp.

2. Click "New Pull Request"

3. Make sure that the following properties are set:

    - Base fork = `libremesh/lime-app`
    - Base = `develop`
    - Head fork = your fork of LiMeApp
    - Compare = the branch you wish to merge

4. Add a description of what the change is and click "Create Pull Request".

At this point, it is recommended to notify one of the other developers of the 
pull request and ask them to perform a quick review.  They will make any comments
in the pull request itself, which you should receive as GitHub notifications or as
emails.

Once the reviewer has OK the pull request, and GitHub has indicated that it can
be merged automatically, you are free to merge the pull request.

#### Dealing With Conflicts

Sometimes GitHub will report that the Pull Request cannot be merged automatically,
which usually means that there are merge conflicts.  

It is usually a good idea to resolve the conflicts on the branch you are working on,
rather than doing so on develop.

In order to do so:

1. Fetch the latest changes from the upstream `develop` branch

    ```git fetch upstream develop```

2. Make sure that you are on your feature branch.

3. Merge the upstream changes into develop.  You will see "conflict messages"

    ```git merge upstream/develop```
     
4. Use a merge tool to resolve the conflicts.  If one is configured with Git,
    running `git mergetool` should bring it up.  Some GUI tools like 
    [this](https://git-scm.com/download/gui/linux) have one built in.

5. Ensure that the merge was successful by building and testing the changes.

6. Commit the changes and push to origin.

     ```git commit```
     ```git push origin <branch>```

If you have a Pull Request already pending, GitHub should pick up the recent
changes and indicate that the PR is ready to be merged.


### More Information

For more information, please see [Collaborating on projects using issues and pull requests](https://help.github.com/categories/collaborating-on-projects-using-issues-and-pull-requests/) in the GitHub help guide.


## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Public or private harassment
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Representation
of a project may be further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team. All complaints will be reviewed
and investigated and will result in a response that is deemed necessary and
appropriate to the circumstances. The project team is obligated to maintain
confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's.

### Attribution

Adapted from [contributor-covenant.org](http://contributor-covenant.org/version/1/4)