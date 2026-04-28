<script lang="ts">
	/**
	 * ApprovalCard Component
	 *
	 * Displays an approval request in the phone mockup (integrator simulator).
	 * Shows action details, server info, and approve/deny buttons.
	 *
	 * @param server - Server name
	 * @param action - Action being requested
	 * @param description - Human-readable action description
	 * @param params - Action parameters (key-value pairs)
	 * @param expiresIn - Minutes until expiration (IMPORTANT: Integrator must update this prop periodically for live countdown announcements to work with aria-live)
	 * @param status - Current status (pending/approved/rejected/expired)
	 * @param onApprove - Callback when user approves
	 * @param onDeny - Callback when user denies
	 */

	import type { Action } from '$lib/types/api';

	interface Props {
		server: string;
		action: Action;
		expiresIn?: number;
		status?: 'pending' | 'approved' | 'rejected' | 'expired';
		onApprove?: () => void;
		onDeny?: () => void;
	}

	let {
		server,
		action,
		expiresIn = 5,
		status = 'pending',
		onApprove,
		onDeny
	}: Props = $props();

	// Format expiration time
	const expiryText = $derived(
		expiresIn >= 1 ? `${expiresIn} minute${expiresIn === 1 ? '' : 's'}` : 'less than 1 minute'
	);
</script>

<div class="approval-card approval-card--{status}" role="article" aria-label="Approval request">
	<header class="approval-card__header">
		<h3 class="approval-card__server">{server}</h3>
	</header>

	<div class="approval-card__body">
		<h4 class="approval-card__title">
			{#if status === 'pending'}
				Approve: {action.description}
			{:else if status === 'approved'}
				✓ Approved
			{:else if status === 'rejected'}
				Denied
			{:else if status === 'expired'}
				Request Expired
			{/if}
		</h4>

		{#if action.params && Object.keys(action.params).length > 0}
			<dl class="approval-card__params">
				{#each Object.entries(action.params) as [key, value]}
					<div class="approval-card__param">
						<dt>{key.replace(/_/g, ' ')}:</dt>
						<dd>{value}</dd>
					</div>
				{/each}
			</dl>
		{/if}

		{#if status === 'pending'}
			<p class="approval-card__expiry" role="status" aria-live="polite">
				Expires in <strong>{expiryText}</strong>
			</p>
		{/if}
	</div>

	{#if status === 'pending'}
		<footer class="approval-card__actions">
			<button
				class="btn btn-primary"
				onclick={onApprove}
				aria-label="Approve with Face ID"
				disabled={!onApprove}
			>
				Approve with Face ID
			</button>
			<button class="btn btn-danger" onclick={onDeny} disabled={!onDeny}>Deny</button>
		</footer>
	{/if}
</div>

<style>
	.approval-card {
		display: flex;
		flex-direction: column;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
		overflow: hidden;
		max-width: 100%;
	}

	.approval-card__header {
		background: var(--color-primary);
		color: white;
		padding: var(--space-4);
		border-radius: var(--radius-md) var(--radius-md) 0 0;
	}

	.approval-card__server {
		margin: 0;
		font-size: var(--text-base);
		font-weight: var(--weight-semibold);
	}

	.approval-card__body {
		padding: var(--space-6);
		flex: 1;
	}

	.approval-card__title {
		font-size: var(--text-lg);
		font-weight: var(--weight-semibold);
		margin: 0 0 var(--space-4) 0;
		color: var(--color-text);
	}

	.approval-card--approved .approval-card__title {
		color: var(--color-success);
	}

	.approval-card--rejected .approval-card__title {
		color: var(--color-danger);
	}

	.approval-card--expired .approval-card__title {
		color: var(--color-text-tertiary);
	}

	.approval-card__params {
		margin: 0 0 var(--space-4) 0;
	}

	.approval-card__param {
		display: flex;
		justify-content: space-between;
		padding: var(--space-2) 0;
		border-bottom: 1px solid var(--color-border);
		font-size: var(--text-sm);
	}

	.approval-card__param:last-child {
		border-bottom: none;
	}

	.approval-card__param dt {
		font-weight: var(--weight-medium);
		color: var(--color-text-secondary);
		text-transform: capitalize;
	}

	.approval-card__param dd {
		margin: 0;
		color: var(--color-text);
		font-family: var(--font-mono);
	}

	.approval-card__expiry {
		font-size: var(--text-sm);
		color: var(--color-text-secondary);
		margin: 0;
	}

	.approval-card__actions {
		display: flex;
		gap: var(--space-3);
		padding: var(--space-4);
		border-top: 1px solid var(--color-border);
	}

	.btn {
		flex: 1;
		padding: var(--space-3) var(--space-4);
		border-radius: var(--radius-sm);
		font-weight: var(--weight-medium);
		font-size: var(--text-base);
		border: none;
		cursor: pointer;
		transition: all var(--transition-base);
		min-height: 44px; /* Touch target WCAG 2.5.8 */
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-primary {
		background: var(--color-primary);
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		background: var(--color-primary-dark);
	}

	.btn-primary:active:not(:disabled) {
		transform: scale(0.98);
	}

	.btn-danger {
		background: transparent;
		color: var(--color-danger);
		border: 1px solid var(--color-danger);
	}

	.btn-danger:hover:not(:disabled) {
		background: var(--color-danger);
		color: white;
	}

	.btn:focus-visible {
		outline: 2px solid var(--focus-color);
		outline-offset: 2px;
	}

	/* High contrast mode */
	@media (prefers-contrast: high) {
		.approval-card {
			border-width: 2px;
		}

		.btn {
			border-width: 2px;
		}
	}
</style>
