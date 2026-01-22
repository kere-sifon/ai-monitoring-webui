# Troubleshooting values.yaml Update

If the `values.yaml` file is not being updated automatically, follow these steps:

## 1. Check if the workflow ran

Go to the **Actions** tab in GitHub and look for:
- **CI/CD** workflow run (should have run when you pushed the tag)
- **Update Image Tag** workflow run (should have run after CI/CD completed)

## 2. Check workflow logs

In the **Update Image Tag** workflow run, check these steps:

### Step: "Determine tag to use"
- Should show: `Event name: repository_dispatch` or `workflow_run`
- Should show: `Dispatch tag: 1.0.0` (or your tag)
- Should show: `Selected tag: 1.0.0`

### Step: "Check if update is needed"
- Should show: `Update needed: latest -> 1.0.0` (or your current tag -> new tag)

### Step: "Update values.yaml"
- Should show the before/after content
- Should show: `✓ Successfully updated tag to 1.0.0`

### Step: "Commit and push changes"
- Should show: `Changes to be committed:`
- Should show: `✓ Successfully updated and pushed values.yaml`

## 3. Common Issues

### Issue: Workflow didn't run
**Solution**: Check if:
- The CI/CD workflow completed successfully
- The repository_dispatch was triggered (check CI/CD logs for "✓ Repository dispatch triggered")
- The workflow_run trigger is working (check if Update Image Tag workflow appears after CI/CD)

### Issue: Tag extraction failed
**Solution**: Check the "Get workflow run context" step logs. It should show:
- `HEAD_REF: refs/tags/v1.0.0` (or similar)
- `Extracted tag: 1.0.0`

### Issue: Commit/push failed
**Solution**: 
- Check if you have branch protection on `main` that prevents direct pushes
- If so, the workflow will create a Pull Request instead
- Check the "Create Pull Request" step

### Issue: Repository path mismatch
**Solution**: Make sure `charts/values.yaml` has the correct repository:
```yaml
image:
  repository: ghcr.io/keresifon/ai-monitoring-webui  # Update this!
```

## 4. Manual Test

You can manually trigger the workflow:

1. Go to **Actions** → **Update Image Tag** → **Run workflow**
2. Enter a tag (e.g., `1.0.0`) in the input field
3. Click **Run workflow**

This will help verify the workflow is working correctly.

## 5. Check Current State

To see what tag is currently in values.yaml:
```bash
grep -A 2 "image:" charts/values.yaml
```

Or check the file directly - it should show:
```yaml
image:
  repository: ghcr.io/keresifon/ai-monitoring-webui
  tag: "1.0.0"  # Should match your latest tag
```
