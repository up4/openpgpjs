/* globals tryTests: true */

const openpgp = typeof window !== 'undefined' && window.openpgp ? window.openpgp : require('../../dist/openpgp');

const chai = require('chai');
chai.use(require('chai-as-promised'));
const input = require('./testInputs.js');

const expect = chai.expect;

describe('Brainpool Cryptography', function () {
  const data = {
    romeo: {
      id: 'fa3d64c9bcf338bc',
      pass: '321',
      pub: [
        '-----BEGIN PGP PUBLIC KEY BLOCK-----',
        '',
        'mHMEWq8ruRMJKyQDAwIIAQELAwMEhi/66JLo1vMhpytb1bYvBhd/aKHde2Zwke7r',
        'zWFTYBZQl/DUrpMrVAhkQhk5G3kqFWf98O/DpvVmY6EDr3IjmODWowNvGfC4Avc9',
        'rYRgV8GbMBUVLIS+ytS1YNpAKW4vtBlidW5ueSA8YnVubnlAYnVubnkuYnVubnk+',
        'iLAEExMKADgWIQSLliWLcmzBLxv2/X36PWTJvPM4vAUCWq8ruQIbAwULCQgHAwUV',
        'CgkICwUWAgMBAAIeAQIXgAAKCRD6PWTJvPM4vIcVAYCIO41QylZkb9W4FP+kd3bz',
        'b73xxwojWpCiw1bWV9Xe/dKA23DtCYhlmhF/Twjh9lkBfihHXs/negGMnqbA8TQF',
        'U1IvBflDcA7yj677lgLkze/yd5hg/ZVx7M8XyUzcEm9xi7h3BFqvK7kSCSskAwMC',
        'CAEBCwMDBCkGskA01sBvG/B1bl0EN+yxF6xPn74WQoAMm7K4n1PlZ1u8RWg+BJVG',
        'Kna/88ZGcT5BZSUvRrYWgqb4/SPAPea5C1p6UYd+C0C0dVf0FaGv5z0gCtc/+kwF',
        '3sLGLZh3rAMBCQmImAQYEwoAIBYhBIuWJYtybMEvG/b9ffo9ZMm88zi8BQJaryu5',
        'AhsMAAoJEPo9ZMm88zi8w1QBfR4k1d5ElME3ef7viE+Mud4qGv1ra56pKa86hS9+',
        'l262twTxe1hk08/FySeJW08P3wF/WrhCrE9UDD6FQiZk1lqekhd9bf84v6i5Smbi',
        'oml1QWkiI6BtbLD39Su6zQKR7u+Y',
        '=wB7z',
        '-----END PGP PUBLIC KEY BLOCK-----'
        ].join('\n'),
      priv: [
        '-----BEGIN PGP PRIVATE KEY BLOCK-----',
        '',
        'lNYEWq8ruRMJKyQDAwIIAQELAwMEhi/66JLo1vMhpytb1bYvBhd/aKHde2Zwke7r',
        'zWFTYBZQl/DUrpMrVAhkQhk5G3kqFWf98O/DpvVmY6EDr3IjmODWowNvGfC4Avc9',
        'rYRgV8GbMBUVLIS+ytS1YNpAKW4v/gcDAtyjmSfDquSq5ffphtkwJ56Zz5jc+jSm',
        'yZaPgmnPOwcgYhWy1g7BcBKYFPNKZlajnV4Rut2VUWkELwWrRmchX4ENJoAKZob0',
        'l/zjgOPug3FtEGirOPmvi7nOkjDEFNJwtBlidW5ueSA8YnVubnlAYnVubnkuYnVu',
        'bnk+iLAEExMKADgWIQSLliWLcmzBLxv2/X36PWTJvPM4vAUCWq8ruQIbAwULCQgH',
        'AwUVCgkICwUWAgMBAAIeAQIXgAAKCRD6PWTJvPM4vIcVAYCIO41QylZkb9W4FP+k',
        'd3bzb73xxwojWpCiw1bWV9Xe/dKA23DtCYhlmhF/Twjh9lkBfihHXs/negGMnqbA',
        '8TQFU1IvBflDcA7yj677lgLkze/yd5hg/ZVx7M8XyUzcEm9xi5zaBFqvK7kSCSsk',
        'AwMCCAEBCwMDBCkGskA01sBvG/B1bl0EN+yxF6xPn74WQoAMm7K4n1PlZ1u8RWg+',
        'BJVGKna/88ZGcT5BZSUvRrYWgqb4/SPAPea5C1p6UYd+C0C0dVf0FaGv5z0gCtc/',
        '+kwF3sLGLZh3rAMBCQn+BwMC6RvzFHWyKqPlVqrm6+j797Y9vHdZW1zixtmEK0Wg',
        'lvQRpZF8AbpSzk/XolsoeQyic1e18C6ubFZFw7cI7ekINiRu/OXOvBnTbc5TdbDi',
        'kKTuOkL+lEwWrUTEwdshbJ+ImAQYEwoAIBYhBIuWJYtybMEvG/b9ffo9ZMm88zi8',
        'BQJaryu5AhsMAAoJEPo9ZMm88zi8w1QBfR4k1d5ElME3ef7viE+Mud4qGv1ra56p',
        'Ka86hS9+l262twTxe1hk08/FySeJW08P3wF/WrhCrE9UDD6FQiZk1lqekhd9bf84',
        'v6i5Smbioml1QWkiI6BtbLD39Su6zQKR7u+Y',
        '=uGZP',
        '-----END PGP PRIVATE KEY BLOCK-----'
        ].join('\n'),
      message: 'test message',
      message_encrypted: [
        '-----BEGIN PGP MESSAGE-----',
        '',
        'hJ4Dry/W2EFbOT4SAwMEiTrIh02fyvPytwIsd9iGDYPFlvFSQmIvz4YW08mKfWrl',
        's4fEAQQBoBPL5k2sZa/sFfapQyyJHhLpv4FyHGY+7zagsv7B47RLbc4jGJhWFJyf',
        'DvCFqJCLH/T9p9nb5qHRMHdSZbXipTymcm9AJvCymKpLQLQFqL7lejjW0lSrVaas',
        'WhCVgYgmoOtgjipYlaGc9NLACAEzHA2B4T5PpTlfQOsp3KkKNkByughSyaRbgppw',
        'M9xxM+Fy0fSvWozKdvn7C2EFMuDbcTRSp2yb8k+ICyGuXvVN2ahASzdtkn+S6+GW',
        'OQUOpu+VxbOf8zICR0FwLkHjIOE6/eUrGX+QIqlej/OTtqBoik2OAbNuqLlFQXsC',
        'Cfp08rB83eU9UIpMgx3hq6tuad7m8Qa8e+/9eLe+Oc67rhWqWcDIKXExmqpMX9Qv',
        'tZa9Z9Eq1OfX2n8kR7BnPnWn9qlhg/63sgNT',
        '=lNCW',
        '-----END PGP MESSAGE-----'
      ].join('\n')
    },
    juliet: {
      id: '37e16a986b8af99e',
      pass: '123',
      pub: [
        '-----BEGIN PGP PUBLIC KEY BLOCK-----',
        '',
        'mFMEWq7fNxMJKyQDAwIIAQEHAgMESvoep0lgc4/HqO0snFMMlVM3Pv19ljC+Ko1k',
        'MkCmJygQTpfxaEBvVm3ChJmkfgWOcgxa5BJUnCg/JaMKkJmr3rQZc3VubnkgPHN1',
        'bm55QHN1bm55LnN1bm55PoiQBBMTCgA4FiEEItRnV1URxiv5gJu+N+FqmGuK+Z4F',
        'Alqu3zcCGwMFCwkIBwMFFQoJCAsFFgIDAQACHgECF4AACgkQN+FqmGuK+Z511QD+',
        'KZLNqlkXkGcoopGdeS9O4oS0mxhAzi++p9btkTZSE24BAJvgM4aR/mwrQB4/5O2f',
        'uA+wEc4vF69fbPIWM/VltNDPuFcEWq7fNxIJKyQDAwIIAQEHAgMEPC4wYIRcxwz8',
        'FVZxihCex/kU/n7n8iP91ZeAXMqx68c0oTwwYweZgf2QPSqwDea6YIcIrCfbHHeE',
        'vtzzyrZllgMBCAeIeAQYEwoAIBYhBCLUZ1dVEcYr+YCbvjfhaphrivmeBQJart83',
        'AhsMAAoJEDfhaphrivmenswBAKm7hI2qGtOZ5kTkOmRELJq76enPSQtdrvtbR5dv',
        'ziZiAP9mU1Kajp2PVmj3IPpd+Q+F/2U8H7nrRndo97c2vPqFtQ==',
        '=SwMu',
        '-----END PGP PUBLIC KEY BLOCK-----'
        ].join('\n'),
      priv: [
        '-----BEGIN PGP PRIVATE KEY BLOCK-----',
        '',
        'lKYEWq7fNxMJKyQDAwIIAQEHAgMESvoep0lgc4/HqO0snFMMlVM3Pv19ljC+Ko1k',
        'MkCmJygQTpfxaEBvVm3ChJmkfgWOcgxa5BJUnCg/JaMKkJmr3v4HAwK7JkccdLrR',
        'Q+UXlwIhInNv95GHFscWoWYaCXMYtyaRleKvGGpKpQjZFvZ6SZncMs/EPQfJwl2L',
        'I2lf8IdzqltNni5shQztIdBiIKm63+TjtBlzdW5ueSA8c3VubnlAc3Vubnkuc3Vu',
        'bnk+iJAEExMKADgWIQQi1GdXVRHGK/mAm7434WqYa4r5ngUCWq7fNwIbAwULCQgH',
        'AwUVCgkICwUWAgMBAAIeAQIXgAAKCRA34WqYa4r5nnXVAP4pks2qWReQZyiikZ15',
        'L07ihLSbGEDOL76n1u2RNlITbgEAm+AzhpH+bCtAHj/k7Z+4D7ARzi8Xr19s8hYz',
        '9WW00M+cqgRart83EgkrJAMDAggBAQcCAwQ8LjBghFzHDPwVVnGKEJ7H+RT+fufy',
        'I/3Vl4BcyrHrxzShPDBjB5mB/ZA9KrAN5rpghwisJ9scd4S+3PPKtmWWAwEIB/4H',
        'AwItYz56B2wwNeUvvrvksyKNTg6doelQWbzUeASV0Qg1IvZqFy20aU6E5B3z1VCt',
        'wyD4GjZjlWsp/gVVk8ZvgBx6z0T/m5a9asD0xkc49iM7iHgEGBMKACAWIQQi1GdX',
        'VRHGK/mAm7434WqYa4r5ngUCWq7fNwIbDAAKCRA34WqYa4r5np7MAQCpu4SNqhrT',
        'meZE5DpkRCyau+npz0kLXa77W0eXb84mYgD/ZlNSmo6dj1Zo9yD6XfkPhf9lPB+5',
        '60Z3aPe3Nrz6hbU=',
        '=3Dct',
        '-----END PGP PRIVATE KEY BLOCK-----'
        ].join('\n'),
      message: 'second test message',
      message_signed: [
        '-----BEGIN PGP SIGNED MESSAGE-----',
        'Hash: SHA512',
        '',
        'second test message',
        '-----BEGIN PGP SIGNATURE-----',
        '',
        'iHUEARMKAB0WIQQi1GdXVRHGK/mAm7434WqYa4r5ngUCWq8vXQAKCRA34WqYa4r5',
        'nuLcAP9PvP2XRqhybqRLwa2OCKyAOmUogvx/xLWDwT4HYQDurwD/dnhMrzBQ6kJg',
        'jpFFbWyAqJavhedwBsFXCUoLH0/BA8w=',
        '=XwF/',
        '-----END PGP SIGNATURE-----'
        ].join('\n')
    }
  };
  function load_pub_key(name) {
    if (data[name].pub_key) {
      return data[name].pub_key;
    }
    const pub = openpgp.key.readArmored(data[name].pub);
    expect(pub).to.exist;
    expect(pub.err).to.not.exist;
    expect(pub.keys).to.have.length(1);
    expect(pub.keys[0].primaryKey.getKeyId().toHex()).to.equal(data[name].id);
    data[name].pub_key = pub.keys[0];
    return data[name].pub_key;
  }
  async function load_priv_key(name) {
    if (data[name].priv_key) {
      return data[name].priv_key;
    }
    const pk = openpgp.key.readArmored(data[name].priv);
    expect(pk).to.exist;
    expect(pk.err).to.not.exist;
    expect(pk.keys).to.have.length(1);
    expect(pk.keys[0].primaryKey.getKeyId().toHex()).to.equal(data[name].id);
    expect(await pk.keys[0].decrypt(data[name].pass)).to.be.true;
    data[name].priv_key = pk.keys[0];
    return data[name].priv_key;
  }
  it('Load public key', function (done) {
    load_pub_key('romeo');
    load_pub_key('juliet');
    done();
  });
  it('Load private key', async function () {
    await load_priv_key('romeo');
    await load_priv_key('juliet');
    return true;
  });
  it('Verify clear signed message', function () {
    const pub = load_pub_key('juliet');
    const msg = openpgp.cleartext.readArmored(data.juliet.message_signed);
    return openpgp.verify({publicKeys: [pub], message: msg}).then(function(result) {
      expect(result).to.exist;
      expect(result.data.trim()).to.equal(data.juliet.message);
      expect(result.signatures).to.have.length(1);
      expect(result.signatures[0].valid).to.be.true;
    });
  });
  it('Sign message', async function () {
    const romeoPrivate = await load_priv_key('romeo');
    const signed = await openpgp.sign({privateKeys: [romeoPrivate], data: data.romeo.message + "\n"});
    const romeoPublic = load_pub_key('romeo');
    const msg = openpgp.cleartext.readArmored(signed.data);
    const result = await openpgp.verify({publicKeys: [romeoPublic], message: msg});

    expect(result).to.exist;
    expect(result.data.trim()).to.equal(data.romeo.message);
    expect(result.signatures).to.have.length(1);
    expect(result.signatures[0].valid).to.be.true;
  });
  it('Decrypt and verify message', async function () {
    const juliet = load_pub_key('juliet');
    const romeo = await load_priv_key('romeo');
    const msg = openpgp.message.readArmored(data.romeo.message_encrypted);
    const result = await openpgp.decrypt({privateKeys: romeo, publicKeys: [juliet], message: msg});

    expect(result).to.exist;
    // trim required because https://github.com/openpgpjs/openpgpjs/issues/311
    expect(result.data.trim()).to.equal(data.romeo.message);
    expect(result.signatures).to.have.length(1);
    expect(result.signatures[0].valid).to.be.true;
  });
  it('Encrypt and sign message', async function () {
    const romeoPrivate = await load_priv_key('romeo');
    const julietPublic = load_pub_key('juliet');
    const encrypted = await openpgp.encrypt({publicKeys: [julietPublic], privateKeys: [romeoPrivate], data: data.romeo.message + "\n"});

    const message = openpgp.message.readArmored(encrypted.data);
    const romeoPublic = load_pub_key('romeo');
    const julietPrivate = await load_priv_key('juliet');
    const result = await openpgp.decrypt({privateKeys: julietPrivate, publicKeys: [romeoPublic], message: message});

    expect(result).to.exist;
    expect(result.data.trim()).to.equal(data.romeo.message);
    expect(result.signatures).to.have.length(1);
    expect(result.signatures[0].valid).to.be.true;
  });

  function omnibus() {
    it('Omnibus BrainpoolP256r1 Test', function () {
      const options = { userIds: {name: "Hi", email: "hi@hel.lo"}, curve: "brainpoolP256r1" };
      return openpgp.generateKey(options).then(function (firstKey) {
        const hi = firstKey.key;
        const pubHi = hi.toPublic();

        const options = { userIds: { name: "Bye", email: "bye@good.bye" }, curve: "brainpoolP256r1" };
        return openpgp.generateKey(options).then(function (secondKey) {
          const bye = secondKey.key;
          const pubBye = bye.toPublic();

          const testData = input.createSomeMessage();
          const testData2 = input.createSomeMessage();
          return Promise.all([
            // Signing message
            openpgp.sign(
              { data: testData, privateKeys: hi }
            ).then(signed => {
              const msg = openpgp.cleartext.readArmored(signed.data);
              // Verifying signed message
              return Promise.all([
                openpgp.verify(
                  { message: msg, publicKeys: pubHi }
                ).then(output => expect(output.signatures[0].valid).to.be.true),
                // Verifying detached signature
                openpgp.verify(
                  { message: openpgp.message.fromText(testData),
                    publicKeys: pubHi,
                    signature: openpgp.signature.readArmored(signed.data) }
                ).then(output => expect(output.signatures[0].valid).to.be.true)
              ]);
            }),
            // Encrypting and signing
            openpgp.encrypt(
              { data: testData2,
                publicKeys: [pubBye],
                privateKeys: [hi] }
            ).then(encrypted => {
              const msg = openpgp.message.readArmored(encrypted.data);
              // Decrypting and verifying
              return openpgp.decrypt(
                { message: msg,
                  privateKeys: bye,
                  publicKeys: [pubHi] }
              ).then(output => {
                expect(output.data).to.equal(testData2);
                expect(output.signatures[0].valid).to.be.true;
              });
            })
          ]);
        });
      });
    });
  }

  omnibus();

  tryTests('Brainpool Worker Tests', omnibus, {
    if: typeof window !== 'undefined' && window.Worker,
    before: function() {
      openpgp.initWorker({ path:'../dist/openpgp.worker.js' });
    },
    beforeEach: function() {
      openpgp.config.use_native = true;
    },
    after: function() {
      openpgp.destroyWorker();
    }
  });

  // TODO find test vectors
});
