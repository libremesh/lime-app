import { isValidHostname, slugify } from "./isValidHostname";

test("slugify some examples", () => {
    expect(slugify("ábcó")).toBe("abco");
    expect(slugify("FooBar")).toBe("FooBar");
    expect(slugify("FóøBar")).toBe("FooBar");
    expect(slugify("ÁÉÍÓÚ")).toBe("AEIOU");
    expect(slugify("foo.foo;foo foo")).toBe("foo-foo-foo-foo");
    expect(slugify("foo-bar")).toBe("foo-bar");
    expect(slugify("123")).toBe("123");
});

test("isValidHostname", () => {
    expect(isValidHostname("foobar")).toBeTruthy();
    expect(isValidHostname("foo-bar")).toBeTruthy();
    expect(isValidHostname("FooBar")).toBeTruthy();
    expect(isValidHostname("foo-123")).toBeTruthy();
    expect(isValidHostname("foo.bar.com")).toBeTruthy();

    expect(isValidHostname("foo,bar")).toBeFalsy();
    expect(isValidHostname("foo;bar")).toBeFalsy();
    expect(isValidHostname("foo_bar")).toBeFalsy();
    expect(isValidHostname("FóøBar")).toBeFalsy();
});
