'use client';

import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { authedGet } from '../utility/common';
import Link from 'next/link';

export default function VerifyEmail() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    authedGet(
      `authentications/email_verification/show?sid=${searchParams.get('token')}`
    )
      .then((res) => {
        console.log(res.data);
        alert(res?.data?.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="mx-auto flex flex-row justify-center">
      <Link href="/login">
        <div className="p-4 mt-16 rounded bg-slate-200 flex hover:bg-slate-300">
          <div className="text-black">Go To Login</div>
        </div>
      </Link>
    </div>
  );
}
