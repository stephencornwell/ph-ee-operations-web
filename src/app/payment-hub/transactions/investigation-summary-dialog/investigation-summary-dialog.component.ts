/** Angular Imports */
import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

/** Custom Services */
import { TransactionsService } from '../service/transactions.service';

/** Custom Models */
import { InvestigationSummary } from '../model/transaction-details.model';

@Component({
  selector: 'mifosx-investigation-summary-dialog',
  templateUrl: './investigation-summary-dialog.component.html',
  styleUrls: ['./investigation-summary-dialog.component.scss']
})
export class InvestigationSummaryDialogComponent implements OnInit {

  isLoading = true;
  summary: InvestigationSummary;
  errorMessage: string;

  workflowInstanceKey: string;

  constructor(
    public dialogRef: MatDialogRef<InvestigationSummaryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private transactionsService: TransactionsService
  ) {
    this.workflowInstanceKey = data.workflowInstanceKey;
  }

  ngOnInit() {
    this.loadSummary();
  }

  loadSummary() {
    this.isLoading = true;
    this.errorMessage = null;
    this.transactionsService.generateInvestigationSummary(this.workflowInstanceKey).subscribe(
      (response: InvestigationSummary) => {
        this.summary = response;
        this.isLoading = false;
      },
      (error: any) => {
        this.errorMessage = error?.error?.message || error?.message || 'Failed to generate investigation summary.';
        this.isLoading = false;
      }
    );
  }

  copyToClipboard() {
    let text = 'Summary:\n' + (this.summary.summary || '') + '\n';
    if (this.summary.rootCause) {
      text += '\nRoot Cause:\n' + this.summary.rootCause + '\n';
    }
    if (this.summary.timeline && this.summary.timeline.length > 0) {
      text += '\nKey Events:\n' + this.summary.timeline.map((event, i) => (i + 1) + '. ' + event).join('\n') + '\n';
    }
    navigator.clipboard.writeText(text);
  }
}
