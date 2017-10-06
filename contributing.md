Contribution Policy

Commit messages should use the git tense. 
They should read as "If I merge this commit, it will..." For example:
- "Add data entry form"
- "Complete signing feature"
- "Refactor notebook view code"

This repo has two main branches: master and develop.
Master will remain as a working build at all times.
Develop wil contain all completed features still in testing.

All new features will be built on feature branches.
To do this run the following command to switch to develop.

	`git checkout develop`

Then create a new feature branch

	`git checkout -b new-feature-name`

The first time you push to this branch you will need to tell
origin that it exists by typing

	`git push --set-upstream origin new-feature-name`

When the feature is complete and tested, create a pull request by
going to https://github.com/FlyingStrainer/notebook-webclient/pulls
and click "Create Pull Request".

Select develop as the base branch and your feature branch as the
head branch. Choose a title and leave any comments that you deem
important to the reviewers. Click "Create pull request" again
to submit the pull request for review.

Once a pull request is reviewed by 1-2 other contributors,
it will be merged.
