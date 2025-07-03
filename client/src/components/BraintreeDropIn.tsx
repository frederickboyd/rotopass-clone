"use client";
import { useEffect, useRef, useState } from "react";
import dropin, { Dropin, Options, create } from "braintree-web-drop-in";

interface BraintreeDropInProps {
  clientToken: string;
  setInstance: React.Dispatch<React.SetStateAction<Dropin | null>>;
  instance: Dropin | null;
}

export default function BraintreeDropIn({
  clientToken,
  setInstance,
  instance,
}: BraintreeDropInProps) {
  const dropinRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!clientToken || !dropinRef.current) return;

    const options: Options = {
      authorization: clientToken,
      container: dropinRef.current,
      card: {
        overrides: {
          fields: {
            number: {
              placeholder: "1111 1111 1111 1111",
            },
            expirationDate: {
              placeholder: "MM/YY",
            },
            cvv: {
              placeholder: "•••",
            },
            postalCode: {
              placeholder: "12345",
            },
          },
        },
        cardholderName: {
          required: true,
        },
      },
    };

    create(options, (err, instance) => {
      if (err) {
        console.error("Drop-in error:", err);
      } else {
        setInstance(instance ?? null);
      }
    });

    return () => {
      instance?.teardown?.();
    };
  }, [clientToken]);

 

  return <div ref={dropinRef} />;
}
