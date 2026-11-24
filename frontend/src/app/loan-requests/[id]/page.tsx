import Link from "next/link";
import { notFound } from "next/navigation";
import { apiFetch } from "../../../lib/api";
import type { LoanRequest } from "../../../lib/loan-types";

type ReceiptPageProps = { params: Promise<{ id: string }> };

export default async function ReceiptPage({ params }: ReceiptPageProps) {
const {id} = await params;
const response = await apiFetch("/loan-request/${encodeURIComponent(id)}");
if (response.status === 400 || response.status === 404) notFound();
const request : LoanRequest | null = response.ok ? await response.json() : null;

  return (
    <main>
      <h1>Loan receipt</h1>
      <Link href="/loan-requests">Back to requests</Link>
      <section className="panel">
        {request ? (
          <dl>
            <dt>ID</dt><dd>{request.id}</dd>
            <dt>Purpose</dt><dd>{request.purpose}</dd>
            <dt>Days</dt><dd>{request.days}</dd>
            <dt>Tool</dt><dd>{request.tool.name}</dd>
          </dl>
        ) : (
        <p>The loan request could not be loaded</p>
        )}
      </section>
    </main>
  );
}

